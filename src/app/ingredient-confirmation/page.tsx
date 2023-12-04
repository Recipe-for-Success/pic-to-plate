"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import TextButton from '../../../components/buttons/TextButton'
import { useImage } from '../../../components/ImageContext'
import { useIngredients } from '../../../components/IngredientContext'
import { useBarcode } from '../../../components/BarcodeContext'

//This page shows the results from the ingredient identification step.
//It allows the user to confirm the ingredient, or reject the ingredient and provide a confirmation for the correct ingredient name.
//It displays the product name, brand name, and the image captured for processing.
//Input: Captured image, text field for correction, buttons
//Output: New ingredient added to list with image and label
const IngredientConfirmationPage = () => {
  const { setIngredients } = useIngredients()
  const { image } = useImage()
  const { detectedBarcode, ingredientName, setDetectedBarcode, setIngredientName } = useBarcode()
  const textRef = useRef<HTMLInputElement>(null)
  const id = Math.random().toString(36).substring(7)
  const handleAddIngredient = (newIngredient: { id: string; src: any; alt: string; label: string }) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const addIngredient = () => {
    const convertedID = parseInt(id, 36) + 1
    const newIngredient = {
      id: convertedID.toString(36),
      src: image,
      alt: ingredientName,
      label: ingredientName
    }
    handleAddIngredient(newIngredient)
    //submit upc
    fetchData(ingredientName)
    setDetectedBarcode(null)
  }

  console.log("WHY NOT: ", ingredientName);

  const affirmIngredient = () => {
    const convertedID = parseInt(id, 36) + 1
    if (textRef.current) {
      const input = textRef.current.value
      console.log(input)
      const newIngredient = {
        id: convertedID.toString(36),
        src: image,
        alt: input,
        label: input
      }
      handleAddIngredient(newIngredient)
      setIngredientName(input)
      fetchData(input)
    }
    //submit upc with input

    setDetectedBarcode(null)
  }

  console.log(ingredientName, "is itnow!");

  const fetchData = async (ingredient: string) => {
    if (detectedBarcode && ingredient) {
      const id = parseInt(detectedBarcode, 10)
      const response = await fetch(
        '/api/submit_upc',
        {
          method: "PUT",
          body: JSON.stringify({
            upc_id: id,
            ingredient: ingredient,
          })
        }
      );

      try {
        const responseBody = await response.text();

        const data = JSON.parse(responseBody);
        console.log('Wacky:', data);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
    else {
      return
    }

  };

  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Is this right?</div>
      <div className="flex mx-auto min-w-[400px] max-w-[400px] min-h-[200px] bg-gray-200">
        {image && <Image src={image} width={540} height={540} alt="Captured Image"></Image>}
      </div>
      <div className="flex justify-center text-center">
        <p>The UPC code of the product you scanned was {detectedBarcode}<br></br>We identified this product as {ingredientName}</p>
      </div>
      <div className="flex justify-center">
        <TextButton text="Yes, add ingredient" onClick={addIngredient} route="/ingredients-list"></TextButton>
      </div>
      <div className="flex justify-center">
        <TextButton text="No, this is actually..." onClick={affirmIngredient} route="/ingredients-list"></TextButton>
        <input ref={textRef} type="text" placeholder={ingredientName} className="flex justify-center max-w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
      </div>
    </>
  )
}

export default IngredientConfirmationPage