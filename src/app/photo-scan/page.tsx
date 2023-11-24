"use client"
import React from 'react'
import Link from 'next/link'
import {TextButton, Scanner} from '../../../components/index'

const PhotoScanPage = () => {
  const onDataCapture = () => {

  }
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Take Picture</div>
      <div className="flex justify-center">
        <Scanner onDataCapture={onDataCapture}></Scanner>
      </div>
    </>
  )
}

export default PhotoScanPage