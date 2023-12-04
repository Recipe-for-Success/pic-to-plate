"use client"
import React from 'react'
import ImageScanner from '../../../components/ImageScanner'
//This page is responsible for displaying interface for identifying ingredients from images using machine learning.
//It will capture an image to submit to the machine learning model server for processing and predictions.
//It has a scanner and a button. The scanner will capture the inputStream and take an image from the camera. 
//Input: Scanner (Captured Image), Buttons
//Output: Identified Ingredient Name and Captured Image
const PhotoScanPage = () => {
  const onDataCapture = () => {

  }
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Take Picture</div>
      <div className="flex justify-center">
        <ImageScanner onDataCapture={onDataCapture}></ImageScanner>
      </div>
    </>
  )
}

export default PhotoScanPage