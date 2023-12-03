"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import {TextButton} from '../../../components/index'
import { useImage } from '../../../components/ImageContext'
import { useIngredients } from '../../../components/IngredientContext'
import { useBarcode } from '../../../components/BarcodeContext'
//This page shows the results from the ingredient identification step.
//It allows the user to confirm the ingredient, or reject the ingredient and provide a confirmation for the correct ingredient name.
//It displays the product name, brand name, and the image captured for processing.
//Input: Captured image, text field for correction, buttons
//Output: New ingredient added to list with image and label
const IngredientConfirmationPage = () => {
  const { ingredients, setIngredients } = useIngredients()
  const { image } = useImage()
  const { detectedBarcode, setDetectedBarcode } = useBarcode()
  const textRef = useRef<HTMLInputElement>(null)

  const handleAddIngredient = (newIngredient: { id: string; src: any; alt: string; label: string }) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const addIngredient = () => {
    const testID = Math.random().toString(36).substring(7)
    const newIngredient = {
      id: testID,
        src: image,
        alt: "Apple",
        label: testID
    }
    handleAddIngredient(newIngredient)
  }

  const affirmIngredient = () => {
    if(textRef.current) {
      const testID = Math.random().toString(36).substring(7)
      const input = textRef.current.value
      console.log(input)
      const newIngredient = {
        id: testID,
          src: image,
          alt: "Apple",
          label: input
      }
      handleAddIngredient(newIngredient)
    }
  }
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Is this right?</div>
      <div className="flex mx-auto min-w-[400px] max-w-[400px] min-h-[200px] bg-gray-200">
        {image && <Image src={image} width={540} height={540} alt="Captured Image"></Image>}
      </div>
      <div className="flex justify-center text-center">
        <p>The UPC code of the product you scanned was {detectedBarcode}<br></br>We identified this product as INGREDIENT NAME</p>
      </div>
      <div className="flex justify-center">
          <TextButton className="" text="Yes, add ingredient" onClick={addIngredient} route="/ingredients-list"></TextButton>
      </div>
      <div className="flex justify-center">
        <TextButton className="" text="No, this is actually..." onClick={affirmIngredient} route="/ingredients-list"></TextButton>
        <input ref={textRef} type="text" placeholder="Actual Ingredient Name" className="flex justify-center max-w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
      </div>
    </>
  )
}

export default IngredientConfirmationPage