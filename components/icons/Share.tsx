import React from 'react'
import Image from 'next/image'
import share from '../../public/icons/share.svg'

const Share = () => {
  return (
    <Image className=""
        src={share} 
        alt="Share Icon"
        width={24}
        height={24}/>
  )
}

export default Share