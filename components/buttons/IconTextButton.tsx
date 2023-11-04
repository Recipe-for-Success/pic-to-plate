import React, { ReactNode } from 'react'
import Link from 'next/link'

interface IconTextButtonProps {
    children: ReactNode;
    text: string;
    route: string;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({text, route, children}) => {
  return (
    <>
      <Link href={route}>
          <button type="button" className="flex rounded-md text-color bg-primary hover:bg-secondary">
              {children}
              {text}
          </button>
      </Link> 
    </>
  )
}

export default IconTextButton