"use client"

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface IconTextButtonProps {
  className?: string
  children: ReactNode
  text: string
  route?: string
  onClick?: () => void
}

//Custom Button with Icon and Text
const IconTextButton: React.FC<IconTextButtonProps> = ({className, text, route, children, onClick}) => {
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
      <div className="rounded justify-center m-2 border-b-4 border-l-2 bg-secondary shadow-lg text-gray-100 hover:text-gray-600">
        <button type="button" className="flex px-4 py-1" onClick={handleClick}>
            {children}
            {text}
        </button>
      </div>
    </>
  )
}

export default IconTextButton