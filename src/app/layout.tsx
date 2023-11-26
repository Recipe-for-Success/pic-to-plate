import type { Metadata } from 'next'
import './globals.css'
import { ImageProvider } from '../../components/ImageContext'
import { IngredientProvider } from '../../components/IngredientContext'
import { BarcodeProvider } from '../../components/BarcodeContext'
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
          <BarcodeProvider>
            <body className="bg-theme text-color">{children}</body>
          </BarcodeProvider>
        </ImageProvider>
      </IngredientProvider>
    </html>
  )
}
