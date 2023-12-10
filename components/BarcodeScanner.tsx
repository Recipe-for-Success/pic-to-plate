"use client"
import React, { useRef, useEffect, useState } from 'react'
import TextButton from './buttons/TextButton';
import { useRouter } from 'next/navigation';
import { useImage } from './ImageContext'
import { useBarcode } from './BarcodeContext';
import Quagga from 'quagga'
import configureQuagga from '@/quaggaConfig'


//BarcodeScanner interface
interface ScannerProps {
  onDataCapture?: (dataURL: string) => void
}

//Barcode Scanner manages displaying video stream from device camera, taking images from video stream, and calling identify_upc API
const Scanner: React.FC<ScannerProps> = ({ onDataCapture }) => {
  //Router for navigation
  const router = useRouter();
  //Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null)
  //useBarcode context to read/set detected barcode as well as set ingredient name and identified status
  const { detectedBarcode, setIdentified, setIngredientName, setDetectedBarcode } = useBarcode()
  //UseImage context to set image for use on next page
  const { setImage } = useImage();

  //UseEffect hook configures quagga for UPC identification and starts video stream from device camera
  useEffect(() => {
    configureQuagga(Quagga)
    getVideo()

    return () => {
      Quagga.stop()
    }
  }, [])

  //Update component when a barcode is detected from Quagga
  useEffect(() => {
    Quagga.onDetected((result) => {
      //Set barcode to result and capture image of barcode
      setDetectedBarcode(result.codeResult.code);
      takeImage()
    });
  }, [router]);

  //If video reference is available, set video source to device camera video
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

  //Ensure only one image is captured using done
  let done = false;

  //Capture image from video stream using canvas context
  const takeImage = () => {
    const video = videoRef.current
    if (video && !done) {
      done = true;
      const canvas = document.createElement('canvas')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext("2d")
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const dataURL = canvas.toDataURL('image/jpeg')
      if (onDataCapture) {
        onDataCapture(dataURL)
      }
      setImage(dataURL)
    }

  }

  //Definte Identify UPC API call
  const fetchData = async (detectedBarcode: string | null,) => {
    const response = await fetch(
      `/api/identify_upc?upc_id=` + detectedBarcode,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //If response is successful, set ingredient name and set identified status to true
    //If unsuccessful, set identified status to false
    try {
      if(!response.ok) {
        setIdentified(false)
      }
      const responseBody = await response.text();
      const data = JSON.parse(responseBody);

      if (data.data.ingredient) {
        setIngredientName(data.data.ingredient);
        setIdentified(true)
      } else if (data.data.Item) {
        setIngredientName(data.data.Item.ingredient.S);
        setIdentified(true)
      } else {
        setIdentified(false)
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  //Provides video element to take an image and a button to trigger API call to identify UPC barcode using Quagga
  return (
    <div id="barcode-scanner">
      
      <video id="barcode-scanner" ref={videoRef}>
        {detectedBarcode && (
          <div>
            <p className="text-white">{detectedBarcode}</p>
          </div>
        )}
      </video>
      <div className="flex justify-center">
        <TextButton className={detectedBarcode === null ? '' : ''} text={detectedBarcode === null ? "Scan Ingredient" : "Click to Identify: " + detectedBarcode} onClick={() => fetchData(detectedBarcode)} disabled={detectedBarcode === null} route='/ingredient-confirmation'></TextButton>
      </div>
    </div>
  )
}

export default Scanner