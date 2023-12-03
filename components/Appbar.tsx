import React from 'react';
import SignInButton from './buttons/SignInButton';

const Appbar = () => {
    return (
        <header className='flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow'>
            <SignInButton></SignInButton>
        </header>
    )
}

export default Appbar;