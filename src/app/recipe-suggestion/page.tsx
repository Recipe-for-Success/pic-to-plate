"use client"
import React, { useEffect, useState } from 'react'
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

type RecipeType = {
  ID: { N: number }
  author: { S: string }
  calories: { N: number }
  carbs: { N: number }
  created: { S: string }
  description: { S: string }
  fat: { N: number }
  ingredient_text: { L: string[] }
  ingredients: { SS: string[] }
  link: { S: string }
  name: { S: string }
  protein: { N: number }
  satFat: { N: number }
  sodium: { N: number }
  steps: { L: string[] }
  sugar: { N: number }
}

//This page will show the list of recipe suggestions based on the list of ingredient names given.
//Input: List of ingredient names
//Output: List of matched suggested recipes and link to recipe details
const RecipeSuggestionPage = () => {
  //Ingredients list to show the user their list of used ingredients
  const { ingredients } = useIngredients()
  //Recipes data from useRecipes context
  const { recipe_id0, recipe_id1, recipe_id2, recipes0, recipes1, recipes2, setRecipes0, setRecipes1, setRecipes2 } = useRecipes()

  //State management for lazy loading 5 recipes as a time (boolean for completion and count of loaded recipes) for recipes with 0, 1, and 2 missing ingredients
  const [recipes0Loaded, setRecipes0Loaded] = useState(false)
  const [recipes1Loaded, setRecipes1Loaded] = useState(false)
  const [recipes2Loaded, setRecipes2Loaded] = useState(false)
  const [loadedRecipeCount0, setLoadedRecipeCount0] = useState(0);
  const [loadedRecipeCount1, setLoadedRecipeCount1] = useState(0);
  const [loadedRecipeCount2, setLoadedRecipeCount2] = useState(0);
  const recipesPerPage = 5;

  //Load 5 recipes from recipes with 0 missing ingredients
  const loadRecipes0 = async () => {
    //Update indexes
    const startIndex = loadedRecipeCount0;
    const endIndex = startIndex + recipesPerPage;

    //If recipes are loaded, do nothing and return
    if (recipes0Loaded) {
      return
    }

    //Loop through next 5 recipe ids and create recipe object for data returned, adding recipe object to recipes0 and updating loaded recipe count
    for (let i = startIndex; i < endIndex && i < recipe_id0.length; i++) {
      const newItemVal = await fetchData(recipe_id0[i])
      if (newItemVal) {

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

        setRecipes0((prevRecipes) => [...prevRecipes, recipe]);
        setLoadedRecipeCount0((prevCount) => prevCount + 1);
      }
    }
    //Check if all recipes have been loaded
    if (loadedRecipeCount0 >= recipe_id0.length) {
      setRecipes0Loaded(true)
    }
  }

  
  //Load 5 recipes from recipes with 1 missing ingredient
  const loadRecipes1 = async () => {
    //Update indexes
    const startIndex = loadedRecipeCount1;
    const endIndex = startIndex + recipesPerPage;
    
    //If recipes are loaded, do nothing and return
    if (recipes1Loaded) {
      return
    }

    //Loop through next 5 recipe ids and create recipe object for data returned, adding recipe object to recipes0 and updating loaded recipe count
    for (let i = startIndex; i < endIndex && i < recipe_id1.length; i++) {
      const newItemVal = await fetchData(recipe_id1[i])
      if (newItemVal) {

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
    //Check if all recipes have been loaded
    if (loadedRecipeCount1 >= recipe_id1.length) {
      setRecipes1Loaded(true)
    }
  }

  //Load 5 recipes from recipes with 2 missing ingredients
  const loadRecipes2 = async () => {
    //Update indexes
    const startIndex = loadedRecipeCount2;
    const endIndex = startIndex + recipesPerPage;

    //If recipes are loaded, do nothing and return
    if (recipes2Loaded) {
      return
    }

    //Loop through next 5 recipe ids and create recipe object for data returned, adding recipe object to recipes0 and updating loaded recipe count
    for (let i = startIndex; i < endIndex && i < recipe_id2.length; i++) {
      const newItemVal = await fetchData(recipe_id2[i])
      if (newItemVal) {

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

    //Check if all recipes have been loaded
    if (loadedRecipeCount2 >= recipe_id2.length) {
      setRecipes2Loaded(true)
    }
  }

  //Define getRecipe API call
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
    //If successful, set newItemVal to returned recipe data and return newItemVal
    try {
      const responseBody = await response.text();

      const data = JSON.parse(responseBody);

      const newItemVal: RecipeType = data.data.Item;

      return newItemVal;
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };
  //Displays three dropdowns for 0, 1, and 2, missing ingredient recipes. Displays list of ingredients used for recipe collection. Provides button to load recipes in RecipeDropDown and a button to go back to edit ingredients list
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

      <RecipeDropdown recipes={recipes0} numMissing='No' loadRecipes={loadRecipes0} recipesRemaining={(recipe_id0.length - loadedRecipeCount0)}></RecipeDropdown>
      <RecipeDropdown recipes={recipes1} numMissing='One' loadRecipes={loadRecipes1} recipesRemaining={(recipe_id1.length - loadedRecipeCount1)}></RecipeDropdown>
      <RecipeDropdown recipes={recipes2} numMissing='Two' loadRecipes={loadRecipes2} recipesRemaining={(recipe_id2.length - loadedRecipeCount2)}></RecipeDropdown>

      <div className="flex justify-center">
        {/* Back to Recipes Button  */}
        <TextButton text="Back to Ingredient Editor" route="/ingredients-list"></TextButton>
      </div>
    </>
  )
}

export default RecipeSuggestionPage