"use client"
import React from 'react'
import Link from 'next/link'
import TextButton from '../../../components/buttons/TextButton'
import { useIngredients } from '../../../components/IngredientContext'

// Define the recipe interface
interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredientText: string[];
  steps: string[];
  url: string;
  calories: number;
  carbs: number;
  fat: number;
  satFat: number;
  protein: number;
  sugar: number;
  sodium: number;
}

//This page will show the list of recipe suggestions based on the list of ingredient names given.
//Input: List of ingredient names
//Output: List of matched suggested recipes and link to recipe details
const RecipeSuggestionPage = () => {
  const {ingredients} = useIngredients()
  // Mocked recipe data for demonstration purposes
  const recipes: Recipe[] = [
    {
      id: 1,
      name: 'Recipe 1',
      description: 'Description of Recipe 1 goes here. You can provide more details about the recipe.',
      ingredientText: ['Ingredient 1', 'Ingredient 2'],
      steps: ['Step 1', 'Step 2'],
      url: '/recipe-info', // Use an appropriate URL
      calories: 300,
      carbs: 40,
      fat: 15,
      satFat: 5,
      protein: 20,
      sugar: 10,
      sodium: 500,
    },
    {
      id: 2,
      name: 'Recipe 2',
      description: 'Description of Recipe 1 goes here. You can provide more details about the recipe.',
      ingredientText: ['Ingredient 1', 'Ingredient 2'],
      steps: ['Step 1', 'Step 2'],
      url: '/recipe-info', // Use an appropriate URL
      calories: 300,
      carbs: 40,
      fat: 15,
      satFat: 5,
      protein: 20,
      sugar: 10,
      sodium: 500,
    },
    {
      id: 3,
      name: 'Recipe 3',
      description: 'Description of Recipe 1 goes here. You can provide more details about the recipe.',
      ingredientText: ['Ingredient 1', 'Ingredient 2'],
      steps: ['Step 1', 'Step 2'],
      url: '/recipe-info', // Use an appropriate URL
      calories: 300,
      carbs: 40,
      fat: 15,
      satFat: 5,
      protein: 20,
      sugar: 10,
      sodium: 500,
    },
    // Add more recipes as needed
  ];
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
        <div key={recipe.id} className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-primary rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{recipe.name}</h2>
          <p>{recipe.description}</p>
          <div className="flex justify-end">
            {/* Link to Recipe Details */}
            <Link href={recipe.url}>
                <TextButton text="More Info"/>
            </Link>
          </div>
        </div>
      ))}
        <div className="flex justify-center">
          {/* Back to Recipes Button  */}
          <TextButton text="Back to Ingredient Editor" route="/ingredients-list"></TextButton>
        </div>
    </>
  )
}

export default RecipeSuggestionPage