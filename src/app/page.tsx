
import TextButton from '../../components/buttons/TextButton'

export default function Home() {
  return (
    <main className="flex flex-col">
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
