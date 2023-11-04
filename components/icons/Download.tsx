import React from 'react'
import Image from 'next/image'
import download from '../../public/icons/download.svg'

const Download = () => {
  return (
    <Image 
        src={download} 
        alt="Download Icon"
        width={24}
        height={24}/>
  )
}

export default Download