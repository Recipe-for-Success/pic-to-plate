import Image from 'next/image'
import Link from 'next/link'
import IdentifyUPC from './test'
import SuggestRecipes from './test'
import SubmitUPC from './test'
import IdentifyImage from './test'

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* <SuggestRecipes /> */}
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
      </div>


    </main>
  )
}
