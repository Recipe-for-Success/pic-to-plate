import type { Metadata } from 'next'
import './globals.css'

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
      <body className="bg-theme text-color">{children}</body>
    </html>
  )
}
