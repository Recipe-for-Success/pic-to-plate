import type { Metadata } from 'next'
import './globals.css'
import { ImageProvider } from '../../components/ImageContext'
import { IngredientProvider } from '../../components/IngredientContext'
export const metadata: Metadata = {
  title: 'PicToPlate',
  description: 'Machine Learning Suggested Recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <IngredientProvider>
        <ImageProvider>
          <body className="bg-theme text-color">{children}</body>
        </ImageProvider>
      </IngredientProvider>
    </html>
  )
}
