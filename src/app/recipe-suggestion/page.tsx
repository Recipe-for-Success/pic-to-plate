import React from 'react'
import Link from 'next/link'
import {TextButton} from '../../../components/index'

const RecipeSuggestionPage = () => {
  return (
    <>
      <div>
        {/* Ingredients List */}
        <div className="flex m-5 justify-center text-center text-3xl font-bold">Ingredients:</div>
        <div className="bg-gray-600 flex max-w-[250px] mx-auto">
          <ul className="">
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
            <li>Ingredient 4</li>
            <li>Ingredient 5</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Recipes List  */}
        <div className="flex m-3 justify-center text-center text-3xl font-bold">Recipes:</div>
        <div>
          <div className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-white/20  rounded-md shadow-sm cursor-pointer border-gray-50 hover:border-black">
            <h2 className="text-xl font-semibold mb-4">Recipe 1</h2>
            <p className="text-gray-700">Description of Recipe 1 goes here. You can provide more details about the recipe.</p>
            <div className="flex justify-end">
              <TextButton text="More Info" route="/recipe-info"></TextButton>
            </div>
          </div>
          <div className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-white/20  rounded-md shadow-sm cursor-pointer border-gray-50 hover:border-black">
            <h2 className="text-xl font-semibold mb-4">Recipe 2</h2>
            <p className="text-gray-700">Description of Recipe 2 goes here. You can provide more details about the recipe.</p>
            <div className="flex justify-end">
              <TextButton text="More Info" route="/recipe-info"></TextButton>
            </div>
          </div>
          <div className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-white/20  rounded-md shadow-sm cursor-pointer border-gray-50 hover:border-black">
            <h2 className="text-xl font-semibold mb-4">Recipe 3</h2>
            <p className="text-gray-700">Description of Recipe 3 goes here. You can provide more details about the recipe.</p>
            <div className="flex justify-end">
              <TextButton text="More Info" route="/recipe-info"></TextButton>
            </div>
          </div>
          <div className="flex m-2 p-2 flex-col mx-auto max-w-[400px] bg-white/20  rounded-md shadow-sm cursor-pointer border-gray-50 hover:border-black">
            <h2 className="text-xl font-semibold mb-4">Recipe 4</h2>
            <p className="text-gray-700">Description of Recipe 4 goes here. You can provide more details about the recipe.</p>
            <div className="flex justify-end">
              <TextButton text="More Info" route="/recipe-info"></TextButton>
            </div>
          </div>  
          <div className="flex justify-center">
            {/* Back to Recipes Button  */}
            <TextButton text="Back to Ingredient Editor" route="/ingredients-list"></TextButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeSuggestionPage