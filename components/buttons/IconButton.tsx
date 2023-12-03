"use client"

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface IconButtonProps {
    className: string
    children: ReactNode
    route: string
    onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({className, route, children, onClick}) => {
  const router = useRouter()

  const handleClick = () => {
    // If a specific onClick callback is provided, execute it
    if (onClick) {
      onClick()
    }

    // // If a route is provided, navigate to the specified route
    // if (route) {
    //   router.push(route)
    // }
  }
  return (
    <>
      <Link href={route}>
          <button type="button" className={className} onClick={handleClick}>
              {children}
          </button>
      </Link> 
    </>
  )
}

export default IconButton