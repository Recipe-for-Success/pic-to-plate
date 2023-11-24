"use client"
import React from 'react'
import Link from 'next/link'
import {TextButton, Scanner} from '../../../components/index'

const BarcodeScanPage = () => {
  const onDataCapture = (dataURL: string | null) => {
    if(dataURL) {
      console.log("We got the image, using it now.")
      //Modify image to fit data format? (not sure if needed yet)
      //Send image data to be scanned for upc code


      return
    }
    console.log("Image was not found, returning without calling API.")
  }
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Scan Barcode</div>
      <div className="flex justify-center">
        <Scanner onDataCapture={onDataCapture}></Scanner>
      </div>
      
    </>
  )
}

export default BarcodeScanPage