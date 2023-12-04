import Image from 'next/image'
import Link from 'next/link'
import IdentifyUPC from './test'
import SuggestRecipes from './test'
import SubmitUPC from './test'
import IdentifyImage from './test'
import { Button } from 'flowbite-react'
import TextButton from '../../components/buttons/TextButton'

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* <SuggestRecipes />
      <h1 className="flex justify-center text-3xl bg-primary p-2 mx-auto w-full"> Website Interfaces</h1>
      <div className="flex flex-col p-1 m-2">
        <div className="flex justify-center">
          <Link href="/ingredients-list">Build Ingredients List</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/barcode-scan">Scan Barcode</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/photo-scan">Scan Photo</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/recipe-info">Recipe Info</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/recipe-suggestion">Recipe Suggestion</Link>
        </div>
        <div className="flex justify-center">
          <Link href="/ingredient-confirmation">Confirm Ingredient</Link>
        </div>
      </div> */}

      <div className="bg-center bg-bottom bg-cover bg-[url('./../../public/food.jpg')] h-screen max-w-screen p-0 overflow-hidden">
        <div className="flex flex-col md:pl-12 pt-24 md:items-start items-center">
          <h1 className="md:pt-8 font-bold xl:text-8xl md:text-7xl sm:text-5xl text-4xl text-white max-w-fit drop-shadow-[0_50px_50px_rgba(0,0,0,1)]">Pic To Plate</h1>
          <div className="mt-2">
            <TextButton text="Explore Now" route='./ingredients-list'></TextButton>
          </div>
        </div>
      </div>

    </main>

  )
}
