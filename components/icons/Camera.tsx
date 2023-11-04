import React from 'react'
import Image from 'next/image'
import camera from '../../public/icons/camera.svg'

const Camera = () => {
  return (
    <Image className=""
        src={camera} 
        alt="Camera Icon"
        width={24}
        height={24}/>
  )
}

export default Camera