"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import TextButton from '../../../components/buttons/TextButton'
import { useIngredients } from '../../../components/IngredientContext'
import { useRecipes } from '../../../components/RecipeContext'
// Define the recipe interface
interface Recipe {
  ID: number
  author: string
  calories: number
  carbs: number
  created: string
  description: string
  fat: number
  ingredient_text: string[]
  ingredients: string[]
  link: string
  name: string
  protein: number
  satFat: number
  sodium: number
  steps: string[]
  sugar: number
}

//This page will show the list of recipe suggestions based on the list of ingredient names given.
//Input: List of ingredient names
//Output: List of matched suggested recipes and link to recipe details
const RecipeSuggestionPage = () => {
  const { ingredients } = useIngredients()
  const { recipe_id0, recipe_id1, recipe_id2, recipes0, recipes1, recipes2, setRecipes0, setRecipes1, setRecipes2 } = useRecipes()
  const [newItem, setNewItem] = useState<Recipe>()
  const [recipes, setRecipes] = useState<Recipe[]>([])

  // useEffect(() => {
  //   loadRecipes()
  // }), [recipes]
  const loadRecipes = async() => {
    for(let i=0; i < recipe_id0.length; i++) {
      const newItemVal = await fetchData(recipe_id0[i])
      if(newItemVal) {
        
        const recipe: Recipe = {
          ID: newItemVal.ID.N,
          author: newItemVal.author.S,
          calories: newItemVal.calories.N,
          carbs: newItemVal.carbs.N,
          created: newItemVal.created.S,
          description: newItemVal.description.S,
          fat: newItemVal.fat.N,
          ingredient_text: newItemVal.ingredient_text.L,
          ingredients: newItemVal.ingredients.SS,
          link: newItemVal.link.S,
          name: newItemVal.name.S,
          protein: newItemVal.protein.N,
          satFat: newItemVal.satFat.N,
          sodium: newItemVal.sodium.N,
          steps: newItemVal.steps.L,
          sugar: newItemVal.sugar.N,
        }
        console.log(recipe)
        recipes.push(recipe)
        // setRecipes0((prevRecipes) => [...prevRecipes, recipe]);
      }
    }
    setRecipes(recipes)
  }
  const fetchData = async (recipeID: number) => {
    const response = await fetch(
      `/api/getRecipe?recipe_id=` + String(recipeID),
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
      // console.log('Response:', data);
      const newItemVal: Recipe = data.data.Item;

      return newItemVal;
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      {/* Ingredients List */}
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Ingredients:</div>
      <div className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-primary rounded-md shadow-lg">
        <ul className="">
          {ingredients && ingredients.map((ingredient) => (
            <li>{ingredient.label}</li>
          ))}
        </ul>
      </div>

      {/* Recipes List  */}
      <div className="flex m-3 justify-center text-center text-3xl font-bold">Recipes:</div>
      
      {recipes.map((recipe) => (
        <div key={recipe.ID} className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-primary rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{recipe.name}</h2>
          <p>{recipe.description}</p>
          <div className="flex justify-end">
            {/* Link to Recipe Details */}
            <Link href={recipe.link}>
              <TextButton text="More Info" onClick={loadRecipes}/>
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        {/* Back to Recipes Button  */}
        <TextButton text="Load Ingredients" onClick={loadRecipes}></TextButton>
      </div>
      <div className="flex justify-center">
        {/* Back to Recipes Button  */}
        <TextButton text="Back to Ingredient Editor" route="/ingredients-list"></TextButton>
      </div>
    </>
  )
}

export default RecipeSuggestionPage