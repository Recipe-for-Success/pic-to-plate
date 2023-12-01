import React from 'react'
import Delete from './icons/Delete';
import IconButton from './buttons/IconButton';
import IngredientCard from './IngredientCard';

interface Ingredient {
    id: string
    src: string;
    alt: string;
    label: string;
}
interface IngredientListProps {
    ingredients: Ingredient[]
    onDelete: (id: string) => void
}
const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onDelete }) => {
    return (
        <div className="grid max-h-[300px] grid-cols-2 gap-4 p-2 mx-auto justify-items-center">
            {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="">
                    <IconButton className="" onClick={() => onDelete(ingredient.id)} route="/ingredients-list"><Delete></Delete></IconButton>
                    <IngredientCard src={ingredient.src} alt={ingredient.alt} label={ingredient.label} />
                </div>
            ))}
        </div>
    )
}

export default IngredientList