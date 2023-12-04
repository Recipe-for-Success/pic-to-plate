import React from 'react';
import SignInButton from './buttons/SignInButton';
import Logo from './icons/Logo';
import IconButton from './buttons/IconButton';

const Appbar = () => {
    return (
        <header className='flex gap-4 p-2 bg-gradient-to-b from-white to-gray-200 shadow'>
            <IconButton className='m-5' route='/' isIcon={true}>
                <Logo></Logo>
            </IconButton>
            <SignInButton></SignInButton>
        </header>
    )
}

export default Appbar;