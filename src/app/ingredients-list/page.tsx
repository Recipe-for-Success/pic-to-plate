"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {Camera, Video, TextButton, IconTextButton, IngredientCard, IngredientList} from '../../../components/index'
import apple from '/public/apple.jpg'
import { ImageProvider, useImage } from '../../../components/ImageContext'
import { useIngredients } from '../../../components/IngredientContext'
//This page displays the application functions including navigation to the barcode id, photo id, and recipe suggestion pages.
//It also displays the current list of ingredients for suggesting recipes. The ingredient list interface will allow single deletion of ingredients.
//Input: Buttons
//Output: Current list of ingredients
const IngredientsListPage = () => {
  // const [ingredients, setIngredients] = useState<{ id: string; src: string; alt: string; label: string }[]>([]);
  const { ingredients, setIngredients } = useIngredients()
  const { image } = useImage()

  
  const func = () => {
    // if(image) {
    //   const testID = Math.random().toString(36).substring(7)
    //   const newIngredient = {
    //     id: testID,
    //     src: image,
    //     alt: "Apple",
    //     label: testID
  
    //   }
    //   handleAddIngredient(newIngredient)
    // }
  }


  const handleDeleteIngredient = (id: string) => {
    setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id));
  };


  return (
    <>
      <div>
        <div className="flex justify-center text-center text-3xl font-bold">Add Ingredients</div>
        
        <div className="flex flex-col p-2 justify-center">
          <div className="flex p-1 justify-center"><IconTextButton className="" text="Scan Barcode" onClick={func} route="/barcode-scan"><Video></Video></IconTextButton></div>
          <div className="flex p-1 justify-center"><IconTextButton className="" text="Take Picture" onClick={func} route="/photo-scan"><Camera></Camera></IconTextButton></div>
          <div className="flex p-1 justify-center"><TextButton className="" text="TEST BUTTON: Add Ingredient" onClick={func} route="/ingredients-list"></TextButton></div>
        </div>
        
        <div className="max-w-[75%] mx-auto bg-red-700 rounded-3xl px-3 py-1">
          <div className="flex justify-center text-center text-white rounded-3xl bg-red-800 text-2xl">Identified Ingredients</div>
          <div className="grid max-h-[300px] p-2  mx-auto justify-items-center overflow-y-scroll">
            <IngredientList ingredients={ingredients} onDelete={handleDeleteIngredient}></IngredientList>

          </div>
        </div>


        <div className="flex p-1 justify-center"><TextButton className="" text="Find Recipes" onClick={func} route="/recipe-suggestion"></TextButton></div>
        
      </div>
    </>
    
  )
}

export default IngredientsListPage