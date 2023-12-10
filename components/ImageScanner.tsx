"use client"
import React, { useRef, useEffect, useState } from 'react'
import TextButton from './buttons/TextButton';
import { useImage } from './ImageContext'
import { useBarcode } from './BarcodeContext';

//ImageScanner interface
interface ScannerProps {
  onDataCapture?: (dataURL: string) => void
}

//Image Scanner manages displaying video stream from device camera, taking images from video stream, and calling identify_image API
const Scanner: React.FC<ScannerProps> = ({ onDataCapture }) => {
  //Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null)
  //UseImage context to set image for use on next page
  const { setImage } = useImage();
  //useBarcode context to set ingredient name for use on next page
  const { setIngredientName } = useBarcode()

  //UseEffect hook starts video stream when loading component
  useEffect(() => {
    getVideo()
  }, [])

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

  //Capture image from video stream using canvas context
  const takeImage = () => {
    const video = videoRef.current
    if (video) {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext("2d")
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const dataURL = canvas.toDataURL()
      if (onDataCapture) {
        onDataCapture(dataURL)
      }
      setImage(dataURL)
      setIngredientName('unidentified')
      fetchData(dataURL.split(';base64,')[1])
    }
  }


  //Define Identify Image API call
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

    //If response is successful, setIngredientName to returned ingredient name
    try {
      const responseBody = await response.text();
      const data = JSON.parse(responseBody);
      setIngredientName(data.ingredient);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  //Provides video element button to take image and a button to trigger API call to identify ingredient using ML model, also navigates to scanned image confirmation page
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