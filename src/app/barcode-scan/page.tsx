"use client"
import React from 'react'
import { Scanner} from '../../../components/index'

//This page is responsible for displaying interface for scanning barcodes.
//It will scan the video feed and show a notification to the user when the UPC is confirmed from the video feed.
//It has a scanner and a button. The scanner will capture the inputStream and recognize UPC codes. It will show the last successful scan as the ingredient to add.
//Input: Scanner (Camera feed), Buttons
//Output: UPC Product Name and Captured Image
const BarcodeScanPage = () => {
  
  const onDataCapture = (dataURL: string | null) => {
    if(dataURL) {
      //Modify image to fit data format? (not sure if needed yet)
      //Send image data to be scanned for upc code

    }
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