"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
//Ingredient data template with unique id, src image, alt text, and ingredient name label
interface Ingredient {
    id: string
    src: string
    alt: string
    label: string
}

//Interface for IngredientContext
interface IngredientContextProps {
    ingredients: Ingredient[]
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

interface IngredientProviderProps {
    children: ReactNode
}

//Create ingredient context using Ingredient properties
const IngredientContext = createContext<IngredientContextProps | undefined>(undefined)

//Ingredient Provider component manages state of Ingredient list data
export const IngredientProvider: React.FC<IngredientProviderProps> = ({ children }) => {
    //Array of Ingredients
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    
    return (
        <IngredientContext.Provider value={{ ingredients, setIngredients}}>
            {children}
        </IngredientContext.Provider>
    )
}
//Define and export useIngredients as context provider for ingredients
export const useIngredients = () => {
    const context = useContext(IngredientContext)
    if(!context) {
        throw new Error('useIngredientContext must be used within an IngredientProvider')
    }
    return context
}