"use client"
import React from 'react'
import Link from 'next/link'
import Share from '../../../components/icons/Share'
import Download from '../../../components/icons/Download'
import Like from '../../../components/icons/Like'
import TextButton from '../../../components/buttons/TextButton'
import IconButton from '../../../components/buttons/IconButton'
//This page links to additional details for Recipes
//It will use the recipe id to lookup data from the recipes table on the server and display it on the page.
//Recipe Info
//Nutrition Info and Visualization
const RecipeInfoPage = () => {
  return (
    <>
      <div className="flex m-5 bg-slate-500">
        {/* Recipe Name Header and Actions  */}
        <div className="flex w-1/2 text-2xl font-bold">
          <label className="flex justify-start w-full whitespace-nowrap">Recipe 1</label>
        </div>
        <div className="flex w-1/2 justify-end">
          <IconButton route="/ingredients-list"><Share></Share></IconButton>
          <IconButton route="/ingredients-list"><Download></Download></IconButton>
        </div>
        
      </div>
      <div>
        {/* Recipe Description */}
        <p className="m-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      <div>
        {/* Nutrition Info  */}
        <label className="m-4 text-2xl">Nutrition Info</label>
        <p className="m-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      
      </div>
      <div className="flex justify-center">
        {/* Back to Recipes Button  */}
        
        <TextButton text="Back to Recipes" route="/recipe-suggestion"></TextButton>
      </div>
    </>
  )
}

export default RecipeInfoPage