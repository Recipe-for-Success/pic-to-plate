"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TextButtonProps {
    className: string
    text: string
    route: string
    onClick: () => void
}

const TextButton: React.FC<TextButtonProps> = ({className, text, route, onClick}) => {
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
            {text}
        </button>
      </Link>
    </>
  )
}

export default TextButton