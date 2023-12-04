"use client"
import React, { useRef, useEffect, useState } from 'react'
import TextButton from './buttons/TextButton';
import { useImage } from './ImageContext'
import { useBarcode } from './BarcodeContext';

interface CapturedImage {
  dataURL: string | null
}

interface ScannerProps {
  onDataCapture?: (dataURL: string) => void
}

const Scanner: React.FC<ScannerProps> = ({ onDataCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { setImage } = useImage();
  const { setIngredientName } = useBarcode()
  useEffect(() => {
    getVideo()
  }, [])

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

      const dataURL = canvas.toDataURL()
      if(onDataCapture) {
        onDataCapture(dataURL)
      }
      setImage(dataURL)
      setIngredientName('unidentified')
      // fetchData(dataURL)
    }
  }

  const fetchData = async (dataURL: string) => {
    const response = await fetch(
        '/api/identify_image',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: dataURL,
            })
        }
    );

    try {
        const responseBody = await response.text();

        const data = JSON.parse(responseBody);
        console.log('Response:', data);
    } catch (error: any) {
        console.error('Error:', error.message);
    }
  };

  return (
    <div id="image-scanner">
      <video id="image-scanner" ref={videoRef}></video>
      <div className="flex justify-center">
        <TextButton className="" text="Identify Ingredient" onClick={takeImage} route="/image-ingredient-confirmation"></TextButton>
      </div>
    </div>
  )
}

export default Scanner