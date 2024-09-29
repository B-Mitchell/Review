'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/app/supabase';
import { setUserId, setEmail, setFirstName, setLastName, setPhoneNumber } from '../../globalRedux/slices/userSlice';

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.user.user_id);

    // Form states
    const [email, setLoginEmail] = useState('');
    const [password, setLoginPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        if (user_id) {
            router.push('/profile'); // Redirect to user profile
        }
    }, [user_id, router]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.log('Supabase error: ', error);
                alert(error.message);
            } else {
                const user = data.user;
                const userMetadata = user.user_metadata;

                // Save logged-in user to state
                dispatch(setUserId(user.id));
                dispatch(setEmail(userMetadata.email));
                dispatch(setFirstName(userMetadata.first_name));
                dispatch(setLastName(userMetadata.last_name));
                dispatch(setPhoneNumber(userMetadata.phone_number));
                
                // Redirect to profile
                router.push('/profile');
            }
        } catch (error) {
            console.error('Login error: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <span className="flex items-center justify-center p-2">
                                {/* Email Icon (replace with actual SVG) */}
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={email}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <span className="flex items-center justify-center p-2">
                                {/* Password Icon (replace with actual SVG) */}
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a5 5 0 00-5 5v3H3v5h14v-5h-2V7a5 5 0 00-5-5z" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={password}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/auth/signup" className="text-green-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;