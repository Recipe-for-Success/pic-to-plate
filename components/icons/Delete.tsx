import React from 'react'
import Image from 'next/image'
import trash from '../../public/icons/trash.svg'

const Delete = () => {
  return (
    <Image 
        src={trash} 
        alt="Trash Icon"
        width={24}
        height={24}/>
  )
}

export default Delete