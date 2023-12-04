"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined)

export const useRecipes = () => {
    const context = useContext(RecipeContext)
    if(!context) {
        throw new Error('useIngredientContext must be used within an IngredientProvider')
    }
    return context
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
    const [recipe_id0, setRecipe_id0] = useState<number[]>([])
    const [recipe_id1, setRecipe_id1] = useState<number[]>([])
    const [recipe_id2, setRecipe_id2] = useState<number[]>([])
    const [recipes0, setRecipes0] = useState<Recipe[]>([])
    const [recipes1, setRecipes1] = useState<Recipe[]>([])
    const [recipes2, setRecipes2] = useState<Recipe[]>([])
    return (
        <RecipeContext.Provider value={{ recipe_id0, setRecipe_id0, recipe_id1, setRecipe_id1, recipe_id2, setRecipe_id2, recipes0, setRecipes0, recipes1, setRecipes1, recipes2, setRecipes2}}>
            {children}
        </RecipeContext.Provider>
    )
}