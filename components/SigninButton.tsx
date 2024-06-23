"use client";
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const SigninButton = () => {
    
    // if (session && session.user) {
    //     return (
    //         <div>Signed in as {session.user.email}</div>
    //     )
    // }
    return (
        <button
            onClick={() => {
                signIn()
            }}
        >
            Sign in
        </button>
    )
}

export default SigninButton