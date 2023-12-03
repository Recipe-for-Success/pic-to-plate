"use client"
import React from 'react'
import Link from 'next/link'
import {Share, Download, Like, TextButton, IconButton} from '../../../components/index'
//This page links to additional details for Recipes
//It will use the recipe id to lookup data from the recipes table on the server and display it on the page.
//Recipe Info
//Nutrition Info and Visualization
const RecipeInfoPage = () => {
  const func = () => {

  }
  return (
    <>
      <div className="flex m-5 bg-slate-500">
        {/* Recipe Name Header and Actions  */}
        <div className="flex w-1/2 text-2xl font-bold">
          <label className="flex justify-start w-full whitespace-nowrap">Recipe 1</label>
        </div>
        <div className="flex w-1/2 justify-end">
          <IconButton className="" route="/ingredients-list" onClick={func}><Share></Share></IconButton>
          <IconButton className="" route="/ingredients-list" onClick={func}><Download></Download></IconButton>
          <IconButton className="" route="/ingredients-list" onClick={func}><Like></Like></IconButton>
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
        
        <TextButton className="" text="Back to Recipes" onClick={func} route="/recipe-suggestion"></TextButton>
      </div>
    </>
  )
}

export default RecipeInfoPage