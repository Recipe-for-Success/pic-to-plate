import React from 'react'
import Link from 'next/link'
import {TextButton} from '../../../components/index'

const IngredientConfirmationPage = () => {
  return (
    <>
      <div className="flex m-5 justify-center text-center text-3xl font-bold">Is this right?</div>
      <div className="flex mx-auto min-w-[400px] max-w-[400px] min-h-[200px] bg-gray-200">
        {/*Placeholder div for camera component */}
      </div>
      <div className="flex justify-center text-center">
        <p>The name of the product you scanned was BRAND NAME<br></br>We identified this product as INGREDIENT NAME</p>
      </div>
      <div className="flex justify-center">
          <TextButton text="Yes, add ingredient" route="/ingredients-list"></TextButton>
      </div>
      <div className="flex justify-center">
        <TextButton text="No, this is actually..." route="/ingredients-list"></TextButton>
        <input type="text" placeholder="Actual Ingredient Name" className="flex justify-center max-w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
      </div>
    </>
  )
}

export default IngredientConfirmationPage