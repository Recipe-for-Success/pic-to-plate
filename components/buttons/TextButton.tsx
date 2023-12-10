"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

interface TextButtonProps {
    className?: string
    disabled?: boolean
    text: string
    route?: string
    onClick?: () => void
}
//Custom Text Button
const TextButton: React.FC<TextButtonProps> = ({className, disabled, text, route, onClick}) => {
  //Router declaration for navigation
  const router = useRouter()

  //If onClick or route is defined for button, execute callback and then navigate to route
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
  //Component HTML Structure
  return (
    <>
      <div className={disabled ? "rounded justify-center m-2 border-b-4 border-l-2 bg-secondary shadow-lg text-gray-100" : "rounded justify-center m-2 border-b-4 border-l-2 bg-primary shadow-lg text-gray-100"}>
        <button type="button" disabled={disabled} className="flex px-4 py-1" onClick={handleClick}>
            {text}
        </button>
      </div>
    </>
  )
}

export default TextButton