'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
//Custom Sign In/Sign Out Button
const SignInButton = () => {
    const { data: session } = useSession();
    //If session and user are defined, show Sign Out button, signOut on click
    if (session && session.user) {
        return (
            <div className='flex flex-row items-center gap-4 ml-auto m-4'>
                <p className='text-sky-600'>{session.user.name}</p>
                <button onClick={() => signOut()} className='text-red-600'>
                    Sign Out
                </button>
            </div>
        )
    }
    //Else show Sign In button, signIn onClick
    return (
        <button onClick={() => signIn()} className='text-white ml-auto m-4'>
            Sign In
        </button>
    )
}

export default SignInButton;