// components/RecipeDropdown.tsx
"use client"
import { useState } from 'react';
import TextButton from './buttons/TextButton';
import Link from 'next/link';
import { useRecipes } from './RecipeContext';

//Recipe interface
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

//Interface for Dropdown Component
interface RecipeDropdownProps {
    recipes: Recipe[];
    numMissing: string
    recipesRemaining: number
    loadRecipes: () => void
}
//RecipeDropdown component manages loading recipes for the user. 
const RecipeDropdown: React.FC<RecipeDropdownProps> = ({ recipes, numMissing, recipesRemaining, loadRecipes}) => {
    //boolean for toggling dropdown
    const [isOpen, setIsOpen] = useState(false);
    //Use recipes context to access fetched recipe data
    const { recipes0, recipes1, recipes2 } = useRecipes()
    
    //Open/Close dropdown, load 5 recipes if available after opening
    const toggleDropdown = () => {
        if(!isOpen && recipesRemaining > 0) {
            loadRecipes()
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex-col justify-center">
            {/* Dropdown toggle button */}
            <div className="flex mx-auto justify-center">
                <TextButton text={isOpen ? 'Minimize Recipes with ' + numMissing + ' Ingredients Missing' : 'View Recipes with ' + numMissing + ' Ingredients Missing'} onClick={toggleDropdown} className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"></TextButton>
            </div>
            {/* Display recipe when dropdown is open and recipes length is greater than 0. Otherwise, show No Recipes Found */}
            {isOpen && (
                <div className="">
                    {recipes.length === 0 ? (
                        <p className="flex justify-center">No Recipes Found</p>
                    ) : (
                        <ul className="p-4">
                            {recipes.map((recipe) => (
                                <div key={recipe.ID} className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-primary rounded-md shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4">{recipe.name}</h2>
                                    <p>{recipe.description}</p>
                                    <div className="flex justify-end">
                                        {/* Link to Recipe Details */}
                                        <Link href={recipe.link}>
                                            <TextButton text="More Info" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                    <div className="flex justify-center">
                        {/* Load Recipes  */}
                        <TextButton text="Load Recipes" onClick={loadRecipes}></TextButton>
                    </div>
                </div>
                
            )}
        </div>
    );
};

export default RecipeDropdown;
