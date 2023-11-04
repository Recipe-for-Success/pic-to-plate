import React from 'react'
import Image from 'next/image'

interface IngredientCardProps {
  src: string;
  alt: string;
  label: string;
}
const IngredientCard: React.FC<IngredientCardProps> = ({ src, alt, label }) => {
  return (
    <div className="hover:bg-red-500 rounded-lg ">
      <Image className="h-auto max-w-full rounded-lg"
          src={src}
          width={250}
          height={250}
          alt={alt}
      />
      <label className="flex text-white justify-center">{label}</label>
    </div>
  )
}

export default IngredientCard