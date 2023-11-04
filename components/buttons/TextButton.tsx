import React from 'react'
import Link from 'next/link'

interface TextButtonProps {
    text: string;
    route: string;
}

const TextButton: React.FC<TextButtonProps> = ({text, route}) => {
  return (
    <>
      <Link href={route}>
        <button type="button" className="rounded-md text-color bg-primary hover:bg-secondary">
            {text}
        </button>
      </Link>
    </>
  )
}

export default TextButton