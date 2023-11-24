"use client"
import React, { useRef, useEffect, useState } from 'react'
import { TextButton } from '.'
interface CapturedImage {
  dataURL: string | null
}

interface ScannerProps {
  onDataCapture: (dataURL: string) => void
}

const Scanner: React.FC<ScannerProps> = ({ onDataCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [capturedImage, setCapturedImage] = useState<CapturedImage>({ dataURL: null})


  useEffect(() => {
    getVideo()
  }, [])

  const takeImage = () => {
    const video = videoRef.current
    if(video) {
      const canvas = document.createElement('canvas')
      console.log("Taking a photo. Say cheese!")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext("2d")
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const dataURL = canvas.toDataURL('image/jpeg')
      // setCapturedImage({ dataURL })
      onDataCapture(dataURL)
    }
    
  }


  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current
        if(video){
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

  return (
    <div>
        <video ref={videoRef}></video>
        <div className="flex justify-center">
          <TextButton text="Scan Ingredient" route="/ingredient-confirmation"></TextButton>
        </div>
        {/* {capturedImage.dataURL && (
        <div>
          <img src={capturedImage.dataURL} alt="Captured" />
        </div>
        )} */}
    </div>
  )
}

export default Scanner