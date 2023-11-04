import React from 'react'
import Link from 'next/link'
import {TextButton} from '../../../components/index'

const BarcodeScanPage = () => {
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Scan Barcode</div>
      <div className="flex mx-auto min-w-[400px] max-w-[400px] min-h-[400px] bg-gray-200">
        {/*Placeholder div for camera component */}
      </div>
      <div className="flex flex-col m-5 justify-center">
          <TextButton text="Scan Ingredient" route="/ingredient-confirmation"></TextButton>
      </div>
    </>
  )
}

export default BarcodeScanPage