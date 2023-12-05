"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import TextButton from '../../../components/buttons/TextButton'
import { useIngredients } from '../../../components/IngredientContext'
import { useRecipes } from '../../../components/RecipeContext'
import RecipeDropdown from '../../../components/RecipeDropDown'
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
  const [recipes0Loaded, setRecipes0Loaded] = useState(false)
  const [recipes1Loaded, setRecipes1Loaded] = useState(false)
  const [recipes2Loaded, setRecipes2Loaded] = useState(false)
  const [loadedRecipeCount0, setLoadedRecipeCount0] = useState(0);
  const [loadedRecipeCount1, setLoadedRecipeCount1] = useState(0);
  const [loadedRecipeCount2, setLoadedRecipeCount2] = useState(0);
  const recipesPerPage = 5;

  const loadRecipes0 = async() => {
    const startIndex = loadedRecipeCount0;
    const endIndex = startIndex + recipesPerPage;
    console.log("Loading Remaining Recipes: \n Starting index: " + startIndex + " , Ending index: " + endIndex + "\n" + "Recipes remaining: " + (recipe_id0.length-startIndex) + "\n" + recipes0Loaded)
    if(recipes0Loaded){
      return
    }

    //Recipes with no missing ingredients
    for(let i=startIndex; i < endIndex && i < recipe_id0.length; i++) {
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
        // recipes.push(recipe)
        setRecipes0((prevRecipes) => [...prevRecipes, recipe]);
        setLoadedRecipeCount0((prevCount) => prevCount + 1);
      }
    }
    if(loadedRecipeCount0 >= recipe_id0.length){
      setRecipes0Loaded(true)
    }
  }

  const loadRecipes1 = async() => {
    const startIndex = loadedRecipeCount1;
    const endIndex = startIndex + recipesPerPage;
    console.log("Loading Remaining Recipes: \n Starting index: " + startIndex + " , Ending index: " + endIndex + "\n" + "Recipes remaining: " + (recipe_id1.length-startIndex) + "\n" + recipes1Loaded)
    if(recipes1Loaded){
      return
    }
    //Recipes with one missing ingredient
    for(let i=startIndex; i < endIndex && i < recipe_id1.length; i++) {
      const newItemVal = await fetchData(recipe_id1[i])
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
        // recipes.push(recipe)
        setRecipes1((prevRecipes) => [...prevRecipes, recipe]);
        setLoadedRecipeCount1((prevCount) => prevCount + 1);
      }
    }
    if(loadedRecipeCount1 >= recipe_id1.length){
      setRecipes1Loaded(true)
    }
  }

  const loadRecipes2 = async() => {
    const startIndex = loadedRecipeCount2;
    const endIndex = startIndex + recipesPerPage;
    console.log("Loading Remaining Recipes: \n Starting index: " + startIndex + " , Ending index: " + endIndex + "\n" + "Recipes remaining: " + (recipe_id2.length-startIndex) + "\n" + recipes2Loaded)
    if(recipes2Loaded){
      return
    }

    //Recipes with two missing ingredients
    for(let i=startIndex; i < endIndex && i < recipe_id2.length; i++) {
      const newItemVal = await fetchData(recipe_id2[i])
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
        // recipes.push(recipe)
        setRecipes2((prevRecipes) => [...prevRecipes, recipe]);
        setLoadedRecipeCount2((prevCount) => prevCount + 1);
      }
    }
    if(loadedRecipeCount2 >= recipe_id2.length){
      setRecipes2Loaded(true)
    }
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
            <li key={ingredient.id}>{ingredient.label}</li>
          ))}
        </ul>
      </div>
      {/* Recipes List  */}
      <div className="flex m-3 justify-center text-center text-3xl font-bold">Recipes:</div>
      
      <RecipeDropdown recipes={recipes0} numMissing='No' loadRecipes={loadRecipes0}></RecipeDropdown>
      <RecipeDropdown recipes={recipes1} numMissing='One' loadRecipes={loadRecipes1}></RecipeDropdown>
      <RecipeDropdown recipes={recipes2} numMissing='Two' loadRecipes={loadRecipes2}></RecipeDropdown>

      {/* Load Recipes  */}
      {/* <div className="flex justify-center">
        <TextButton text="Load Recipes" onClick={loadRecipes0}></TextButton>
      </div> */}
      <div className="flex justify-center">
        {/* Back to Recipes Button  */}
        <TextButton text="Back to Ingredient Editor" route="/ingredients-list"></TextButton>
      </div>
    </>
  )
}

export default RecipeSuggestionPage