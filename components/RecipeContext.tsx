"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
//Recipe data template
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

//Interface for RecipeContext
interface RecipeContextProps {
    recipe_id0: number[]
    setRecipe_id0: React.Dispatch<React.SetStateAction<number[]>>
    recipe_id1: number[]
    setRecipe_id1: React.Dispatch<React.SetStateAction<number[]>>
    recipe_id2: number[]
    setRecipe_id2: React.Dispatch<React.SetStateAction<number[]>>
    recipes0: Recipe[]
    setRecipes0: React.Dispatch<React.SetStateAction<Recipe[]>>
    recipes1: Recipe[]
    setRecipes1: React.Dispatch<React.SetStateAction<Recipe[]>>
    recipes2: Recipe[]
    setRecipes2: React.Dispatch<React.SetStateAction<Recipe[]>>
}

interface RecipeProviderProps {
    children: ReactNode
}

//Create ingredient context using Recipe properties
const RecipeContext = createContext<RecipeContextProps | undefined>(undefined)

//Recipe Provider component manages state of sets of recipes
export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
    //Array of numbers for recipe id's with 0 missing ingredients
    const [recipe_id0, setRecipe_id0] = useState<number[]>([])
    //Array of Recipes for recipes with 0 missing ingredients
    const [recipes0, setRecipes0] = useState<Recipe[]>([])
    //Array of numbers for recipe id's with 1 missing ingredients
    const [recipe_id1, setRecipe_id1] = useState<number[]>([])
    //Array of Recipes for recipes with 1 missing ingredients
    const [recipes1, setRecipes1] = useState<Recipe[]>([])
    //Array of numbers for recipe id's with 2 missing ingredients
    const [recipe_id2, setRecipe_id2] = useState<number[]>([])
    //Array of Recipes for recipes with 2 missing ingredients
    const [recipes2, setRecipes2] = useState<Recipe[]>([])

    return (
        <RecipeContext.Provider value={{ recipe_id0, setRecipe_id0, recipe_id1, setRecipe_id1, recipe_id2, setRecipe_id2, recipes0, setRecipes0, recipes1, setRecipes1, recipes2, setRecipes2}}>
            {children}
        </RecipeContext.Provider>
    )
}
//Define and export useRecipes as context provider for recipes
export const useRecipes = () => {
    const context = useContext(RecipeContext)
    if(!context) {
        throw new Error('useIngredientContext must be used within an IngredientProvider')
    }
    return context
}