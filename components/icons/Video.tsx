import React from 'react'
import Image from 'next/image'
import video from '../../public/icons/video.svg'

const Video = () => {
  return (
    <Image 
        src={video} 
        alt="Video Icon"
        width={24}
        height={24}/>
  )
}

export default Video