"use client"
import React, { useRef, useEffect, useState } from 'react'
import TextButton from './buttons/TextButton';
import { useRouter } from 'next/navigation';
import { useImage } from './ImageContext'
import { useBarcode } from './BarcodeContext';
import Quagga from 'quagga'
import configureQuagga from '@/quaggaConfig'

interface CapturedImage {
  dataURL: string | null
}

interface ScannerProps {
  onDataCapture?: (dataURL: string) => void
}


const Scanner: React.FC<ScannerProps> = ({ onDataCapture }) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null)
  const [capturedImage, setCapturedImage] = useState<CapturedImage>({ dataURL: null })
  const { detectedBarcode, setIngredientName, setDetectedBarcode } = useBarcode()
  const { setImage } = useImage();
  useEffect(() => {
    configureQuagga(Quagga)
    getVideo()

    return () => {
      Quagga.stop()
    }
  }, [])
  useEffect(() => {
    // Update your component state when a barcode is detected
    Quagga.onDetected((result) => {
      setDetectedBarcode(result.codeResult.code);
      takeImage()
    });
  }, [router]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 540 } })
      .then(stream => {
        let video = videoRef.current
        if (video) {
          video.srcObject = stream
          video.addEventListener('loadeddata', () => {
            video?.play().catch((error) => {
              console.error('Error playing the video:', error)
            })
          })
        }
      })
      .catch(err => {
        console.error("error:", err)
      })
  }

  const takeImage = () => {
    const video = videoRef.current
    if (video) {
      const canvas = document.createElement('canvas')
      console.log("Taking a photo. Say cheese!")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext("2d")
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const dataURL = canvas.toDataURL('image/jpeg')
      // setCapturedImage({ dataURL })
      if(onDataCapture) {
        onDataCapture(dataURL)
      }
      setImage(dataURL)
    }

  }

  const fetchData = async (detectedBarcode: string | null) => {
    console.log(detectedBarcode)
    const response = await fetch(
      
        `/api/identify_upc?upc_id=` + detectedBarcode,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    try {
        const responseBody = await response.text();

        const data = JSON.parse(responseBody);
        console.log('Response:', data);
        setIngredientName(data.data.ingredient)
    } catch (error: any) {
        console.error('Error:', error.message);
    }
  };

  return (
    <div id="barcode-scanner">
      <video id="barcode-scanner" ref={videoRef}></video>
      <div className="flex justify-center">
        <TextButton className="" text="Scan Ingredient" onClick={() => fetchData(detectedBarcode)} disabled={detectedBarcode === null} route='/ingredient-confirmation'></TextButton>
      </div>
    </div>
  )
}

export default Scanner