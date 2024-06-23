"use client";
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, signOut, useSession } from 'next-auth/react';

const GoogleSignIn = () => {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onGoogleLogin = async () => {
    await signIn("google");
  }

  const onStartup = async () => {
    if (isLoggedIn) return;
    if (session && session.user) {
      try {
        const response = await axios.post("/api/googleSignin", {
          email: session.user.email,
          name: session.user.name,
          profileUrl: session.user.image
        });
        setIsLoggedIn(true);
        toast.success('You are logged in!')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }

    }
  }

  useEffect(() => {
    onStartup();
  }, [session, session?.user])

  const onDeleteClick = async () => {
    try {
      const instance = axios.create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_DOMAIN
      });
      const response = await instance.delete("/user/delete");
      if (response.status === 200) {
        setIsLoggedIn(false);
        toast.success("Account deleted!")
      }
    } catch (error: any) {
      toast.error("Error deleting account!")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-6">
          <div>
            <button
              onClick={onGoogleLogin}
              type="button"
              disabled={isLoggedIn}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="flex">
                <Image
                  src="/google.png"
                  width={24}
                  height={24}
                  alt="Picture of the author"
                  className="pe-1"
                />
                Continue with Google
              </div>
            </button>
          </div>

          {
            (isLoggedIn && (
              <div>
                <button
                  onClick={()=>{
                    signOut()
                    toast.success("You are logged out!")
                  }}
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign out: {session?.user?.email}
                </button>
                <button
                  onClick={onDeleteClick}
                  type="button"
                  className="w-full flex justify-center my-2 py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            ))
          }
        </form>
      </div>
    </div>
  );
}

export default GoogleSignIn