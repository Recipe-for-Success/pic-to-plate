import React from 'react'
import Image from 'next/image'
import like from '../../public/icons/like.svg'

const Like = () => {
  return (
    <Image 
        src={like} 
        alt="Like Icon"
        width={24}
        height={24}/>
  )
}

export default Like