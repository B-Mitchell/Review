'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn,SignInButton, SignedOut, UserButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser(); // Get the signed-in user details

    // handle navigation
    const handleNavigation = (path) => {
        router.push(path);
        setIsOpen(prev => !prev);
    };

    return (
        <nav className="bg-white shadow-md p-3 text-[1rem]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 align-middle mt-4">
                        <h1 className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => handleNavigation('/')}>
                            Review
                        </h1>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <button onClick={() => handleNavigation('/')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</button>
                        <button onClick={() => handleNavigation('/profile')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Profile</button>
                        <button onClick={() => handleNavigation('/reviews')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Reviews</button>
                        <button onClick={() => handleNavigation('/categories')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Categories</button>
                        
                        {/* When the user is signed in, show profile and logout */}
                        <SignedIn>
                            <UserButton /> {/* Clerk's UserButton handles profile and logout */}
                            <span className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium mt-4">
                              {user?.firstName} {user?.lastName} {/* Display the user's name */}
                            </span>
                        </SignedIn>
                        
                        {/* When the user is signed out, show login and sign-up */}
                        <SignedOut>
                          <SignInButton />
                        </SignedOut>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none" onClick={() => setIsOpen(!isOpen)} aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} shadow-lg`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              <button onClick={() => handleNavigation('/')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-[100%]">Home</button>
              <button onClick={() => handleNavigation('/profile')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-[100%]">Profile</button>
              <button onClick={() => handleNavigation('/reviews')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-[100%]">Reviews</button>
              <button onClick={() => handleNavigation('/categories')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-[100%]">Categories</button>

              {/* Show logout if the user is signed in */}
              <br/>
              <br/>
              <SignedIn>
                <UserButton /> {/* Clerk's UserButton in the mobile view */}
                <span className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                  {user?.firstName} {user?.lastName} {/* Display the user's name */}
                </span>
              </SignedIn>

              <br /><br />
              {/* Show login and sign-up if the user is signed out */}
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
