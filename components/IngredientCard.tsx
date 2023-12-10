import React from 'react'
import Image from 'next/image'
import IconButton from './buttons/IconButton';
import Delete from './icons/Delete';

//Interface for IngredientCard
interface IngredientCardProps {
  id: string;
  src: string;
  alt: string;
  label: string;
  onDelete: (id: string) => void
}

//Displays Ingredient image, label, and provides IconButton to delete the ingredient
const IngredientCard: React.FC<IngredientCardProps> = ({ id, src, alt, label, onDelete }) => {
  return (
    <div className="relative rounded-sm overflow-hidden">
      <Image className="h-auto max-w-full rounded-lg"
          src={src}
          width={540}
          height={540}
          alt={alt}
      />
      <div className="absolute inset-0 flex flex-col justify-start p-2">
        <div className="flex bg-primary rounded-lg justify-center">
          <label className="text-white">{label}</label> 
        </div>
        <div className="absolute bottom-0 right-0 p-1 w-auto h-auto">
          <IconButton onClick={() => onDelete(id)} route="/ingredients-list"><Delete></Delete></IconButton>
        </div>
      </div>
    </div>
  )
}

export default IngredientCard
