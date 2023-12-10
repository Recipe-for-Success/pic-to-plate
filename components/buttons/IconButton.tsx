"use client"

import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

let normal: string = "flex p-2"
let isIcon: boolean = false;

interface IconButtonProps {
  className?: string
  children: ReactNode
  route?: string
  isIcon?: boolean
  onClick?: () => void
}

//Custom Button with Icon
const IconButton: React.FC<IconButtonProps> = ({ className, route, children, onClick }) => {
  //Router declaration for navigation
  const router = useRouter()
  //Override default styles if className is defined
  useEffect(() => {
    if (isIcon && className) {
      normal = className;
    }
  }), []

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
      <div className='rounded justify-center m-2 border-b-4 border-l-2 bg-secondary shadow-lg'>
        <button type="button" className={normal} onClick={handleClick}>
          {children}
        </button>
      </div>
    </>
  )
}

export default IconButton