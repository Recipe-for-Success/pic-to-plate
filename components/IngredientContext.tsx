"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Ingredient {
    id: string
    src: string
    alt: string
    label: string
}

interface IngredientContextProps {
    ingredients: Ingredient[]
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

interface IngredientProviderProps {
    children: ReactNode
}

const IngredientContext = createContext<IngredientContextProps | undefined>(undefined)

export const useIngredients = () => {
    const context = useContext(IngredientContext)
    if(!context) {
        throw new Error('useIngredientContext must be used within an IngredientProvider')
    }
    return context
}

export const IngredientProvider: React.FC<IngredientProviderProps> = ({ children }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    return (
        <IngredientContext.Provider value={{ ingredients, setIngredients}}>
            {children}
        </IngredientContext.Provider>
    )
}