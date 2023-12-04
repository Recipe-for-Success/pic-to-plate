'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'

const SignInButton = () => {
    const { data: session } = useSession();

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
    return (
        <button onClick={() => signIn()} className='text-white ml-auto m-4'>
            Sign In
        </button>
    )
}

export default SignInButton;