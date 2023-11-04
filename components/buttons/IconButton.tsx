import Link from 'next/link'
import React, { ReactNode } from 'react'

interface IconButtonProps {
    children: ReactNode;
    route: string;
}

const IconButton: React.FC<IconButtonProps> = ({route, children}) => {
  return (
    <>
      <Link href={route}>
          <button type="button" className="rounded-md text-color bg-primary hover:bg-secondary">
              {children}
          </button>
      </Link> 
    </>
  )
}

export default IconButton