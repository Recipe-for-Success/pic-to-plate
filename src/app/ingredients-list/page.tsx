"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Camera from '../../../components/icons/Camera'
import Video from '../../../components/icons/Video'
import TextButton from '../../../components/buttons/TextButton'
import IconTextButton from '../../../components/buttons/IconTextButton'
import IngredientCard from '../../../components/IngredientCard'
import IngredientList from '../../../components/IngredientList'
import apple from '/public/apple.jpg'
import { useIngredients } from '../../../components/IngredientContext'
//This page displays the application functions including navigation to the barcode id, photo id, and recipe suggestion pages.
//It also displays the current list of ingredients for suggesting recipes. The ingredient list interface will allow single deletion of ingredients.
//Input: Buttons
//Output: Current list of ingredients
const IngredientsListPage = () => {
  const { ingredients, setIngredients } = useIngredients()

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id));
  };


  return (
    <>
      <div>
        <div className="flex justify-center text-center text-3xl font-bold">Add Ingredients</div>
        
        <div className="flex flex-col p-2 justify-center">
          <div className="flex p-1 justify-center"><IconTextButton text="Scan Barcode" route="/barcode-scan"><Video></Video></IconTextButton></div>
          <div className="flex p-1 justify-center"><IconTextButton text="Take Picture" route="/photo-scan"><Camera></Camera></IconTextButton></div>
        </div>
        
        <div className="max-w-[50%] mx-auto bg-primary">
          <div className="text-center text-white bg-secondary text-2xl">Identified Ingredients</div>
          <div className="grid max-h-[300px] p-2  mx-auto justify-items-center overflow-y-scroll">
            <IngredientList ingredients={ingredients} onDelete={handleDeleteIngredient}></IngredientList>
          </div>
        </div>

        <div className="flex p-1 justify-center">
          <TextButton text="Find Recipes" route="/recipe-suggestion"></TextButton>
        </div>
      </div>
    </>
    
  )
}

export default IngredientsListPage