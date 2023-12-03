"use client"

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface IconButtonProps {
    className?: string
    children: ReactNode
    route?: string
    onClick?: () => void
}

const IconButton: React.FC<IconButtonProps> = ({className, route, children, onClick}) => {
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
      <div className="rounded justify-center m-2 border-b-4 border-l-2 bg-secondary shadow-lg">
        <button type="button" className="flex p-2" onClick={handleClick}>
            {children}
        </button>
      </div>
    </>
  )
}

export default IconButton