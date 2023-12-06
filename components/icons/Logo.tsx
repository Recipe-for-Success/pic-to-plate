import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import Link from 'next/link'

const Logo = () => {
    return (
        <Image className="m-0"
            src={logo}
            alt="Home"
            width={45}
            height={45}
        />

    )
}

export default Logo