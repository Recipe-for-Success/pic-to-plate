"use client"
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import TextButton from '../../../components/buttons/TextButton'
import { useImage } from '../../../components/ImageContext'
import { useIngredients } from '../../../components/IngredientContext'
import { useBarcode } from '../../../components/BarcodeContext'

//This page shows the results from the ingredient identification step.
//It allows the user to confirm the ingredient, or reject the ingredient and provide a confirmation for the correct ingredient name.
//It displays the product name and the image captured for processing.
//Input: Captured image, text field for correction, buttons
//Output: New ingredient added to list with image and label
const IngredientConfirmationPage = () => {
  //UseIngredients context to setIngredients list
  const { setIngredients } = useIngredients()
  //UseImage context to read/set captured image
  const { image, setImage } = useImage()
  //UseBarcode context to read/set detected barcode string, identified boolean, and ingredient name
  const { detectedBarcode, identified, ingredientName, setDetectedBarcode, setIdentified, setIngredientName } = useBarcode()
  //Reference to input element
  const textRef = useRef<HTMLInputElement>(null)
  //Randomized number for unique id generation
  const id = Math.random().toString(36).substring(7)
  
  //Add ingredient to ingredients list
  const handleAddIngredient = (newIngredient: { id: string; src: any; alt: string; label: string }) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };


  //Add ingredient using ingredientName as label
  const addIngredient = () => {
    const convertedID = parseInt(id, 36) + 1
    const newIngredient = {
      id: convertedID.toString(36),
      src: image,
      alt: ingredientName,
      label: ingredientName
    }
    handleAddIngredient(newIngredient)
    //submit upc to database
    fetchData(ingredientName)
    setDetectedBarcode(null)
    setIngredientName('')
    setImage(null)
    setIdentified(false)
  }

  //Add ingredient using textbox input as label
  const affirmIngredient = () => {
    const convertedID = parseInt(id, 36) + 1
    if (textRef.current) {
      const input = textRef.current.value

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

    //submit upc with input to database
    setDetectedBarcode(null)
    setIngredientName('')
    setImage(null)
    setIdentified(false)
  }

  //Define Submit UPC API call to add UPC and ingredient name to database
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
      if(response.status == 400){
        return
      }
      try {
        const responseBody = await response.text();
        const data = JSON.parse(responseBody);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    } else {
      return
    }
  };
  //Displays image captured, text showing identified ingredient, button to add without correction, and a button with text input to add with correction
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Is this right?</div>
      <div className="flex mx-auto min-w-[400px] max-w-[400px] min-h-[200px] bg-gray-200">
        {image && <Image src={image} width={540} height={540} alt="Captured Image"></Image>}
      </div>
      <div className="flex justify-center text-center">
        <p>The UPC code of the product you scanned was {detectedBarcode}<br></br> {identified ? ("We identified this product as " + ingredientName + ".") : ("We could not identify your ingredient.")}</p>
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