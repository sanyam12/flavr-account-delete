"use client";
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CredentialsLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLogin = async () => {
        try {
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;

            const response = await axios.post("/api/login", {
                email: email,
                password: password,
            });
            
            if (response.status === 200) {
                setIsLoggedIn(true);
                // console.log("Login successful");
                toast.success('You are logged in!')
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

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
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <button
                            onClick={onLogin}
                            disabled={isLoggedIn}
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>

                    {
                        (isLoggedIn && (
                            <div>
                                <button
                                    onClick={onDeleteClick}
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Delete Account
                                </button>
                            </div>
                        ))
                    }
                </form>
            </div>
        </div>
    )
}

export default CredentialsLogin