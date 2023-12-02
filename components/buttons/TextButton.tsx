"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TextButtonProps {
    className?: string
    text: string
    route?: string
    onClick?: () => void
}

const TextButton: React.FC<TextButtonProps> = ({className, text, route, onClick}) => {
  const router = useRouter()

  const handleClick = () => {
    // If a specific onClick callback is provided, execute it
    if (onClick) {
      onClick()
    }

    // If a route is provided, navigate to the specified route
    if (route) {
      router.push(route)
    }
  }
  return (
    <>
      <div className="rounded justify-center m-2 border-b-4 border-l-2 bg-secondary shadow-lg text-gray-100 hover:text-gray-600">
        <button type="button" className="flex px-4 py-1" onClick={handleClick}>
            {text}
        </button>
      </div>
    </>
  )
}

export default TextButton