import React from 'react'
import Link from 'next/link'
import {Camera, Video, TextButton, IconTextButton, IngredientCard} from '../../../components/index'
import apple from '/public/apple.jpg'

const IngredientsListPage = () => {
  return (
    <>
      <div>
        <div className="flex justify-center text-center text-3xl font-bold">Add Ingredients</div>
        
        <div className="flex flex-col p-2 justify-center">
          <div className="flex p-1 justify-center"><IconTextButton text="Scan Barcode" route="/barcode-scan"><Video></Video></IconTextButton></div>
          <div className="flex p-1 justify-center"><IconTextButton text="Take Picture" route="/photo-scan"><Camera></Camera></IconTextButton></div>
        </div>
        
        <div className="mx-auto min-h-[250px] max-h-[375px] min-w-[176px] max-w-[575px] bg-red-700 rounded-3xl px-3 py-1">
          <div className="flex justify-center text-center text-white rounded-3xl bg-red-800 text-2xl">Identified Ingredients</div>
          <div className="grid min-h-[200px] max-h-[300px] min-w-[176px] max-w-[575px] grid-cols-2 gap-2  p-2 mx-auto justify-items-center overflow-y-scroll">
            <IngredientCard
                src={apple.src}
                alt="Apple"
                label="Apple"/>
            <IngredientCard 
              src={apple.src}
              alt="Apple"
              label="Apple"/>
            <IngredientCard 
              src={apple.src}
              alt="Apple"
              label="Apple"/>
            <IngredientCard 
              src={apple.src}
              alt="Apple"
              label="Apple"/>
            <IngredientCard 
                src={apple.src}
                alt="Apple"
                label="Apple"/>
            <IngredientCard 
              src={apple.src}
              alt="Apple"
              label="Apple"/>
            <IngredientCard 
              src={apple.src}
              alt="Apple"
              label="Apple"/>
            <IngredientCard 
              src={apple.src}
              alt="Apple"
              label="Apple"/>
          </div>
        </div>


        <div className="flex p-1 justify-center"><TextButton text="Find Recipes" route="/recipe-suggestion"></TextButton></div>
        
      </div>
    </>
    
  )
}

export default IngredientsListPage