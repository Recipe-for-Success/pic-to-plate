"use client"
import React, { useState } from 'react'
import Camera from '../../../components/icons/Camera'
import Video from '../../../components/icons/Video'
import TextButton from '../../../components/buttons/TextButton'
import IconTextButton from '../../../components/buttons/IconTextButton'
import IngredientList from '../../../components/IngredientList'
import { useIngredients } from '../../../components/IngredientContext'
import { useRecipes } from '../../../components/RecipeContext'

//This page displays the application functions including navigation to the barcode id, photo id, and recipe suggestion pages.
//It also displays the current list of ingredients for suggesting recipes. The ingredient list interface will allow single deletion of ingredients.
//Input: Buttons
//Output: Current list of ingredients
const IngredientsListPage = () => {
  const { ingredients, setIngredients } = useIngredients()
  const { setRecipe_id0, setRecipe_id1, setRecipe_id2 } = useRecipes()

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id));
  };

  const fetchData = async () => {
    const queryString: string = ingredients
      .map((ingredient) => `&ID=${ingredient.label}`)
      .join("");
      console.log(queryString)
    const response = await fetch(
        `/api/suggest_recipes?` + queryString,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    try {
        const responseBody = await response.text();

        const data = JSON.parse(responseBody);
        console.log('Response!!!!:', data.data[0]);
        //Use data to get Recipes
        setRecipe_id0(data.data[0])
        setRecipe_id1(data.data[1])
        setRecipe_id2(data.data[2])

    } catch (error: any) {
        console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center text-center text-3xl font-bold">Add Ingredients</div>
        
        <div className="flex flex-col p-2 justify-center">
          <div className="flex p-1 justify-center"><IconTextButton text="Scan Barcode" route="/barcode-scan"><Video></Video></IconTextButton></div>
          <div className="flex p-1 justify-center"><IconTextButton text="Take Picture" route="/photo-scan"><Camera></Camera></IconTextButton></div>
        </div>
        
        <div className="rounded-lg max-w-[50%] mx-auto bg-primary">
          <div className="text-center bg-secondary text-2xl rounded-t-lg">Identified Ingredients</div>
          <div className="grid max-h-[300px] p-2  mx-auto justify-items-center overflow-y-scroll">
            <IngredientList ingredients={ingredients} onDelete={handleDeleteIngredient}></IngredientList>
          </div>
        </div>

        <div className="flex p-1 justify-center">
          <TextButton text="Find Recipes" onClick={fetchData} route="/recipe-suggestion"></TextButton>
        </div>
      </div>
    </>
    
  )
}

export default IngredientsListPage