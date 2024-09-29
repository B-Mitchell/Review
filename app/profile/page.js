'use client'; // This is necessary for Client components in the app directory
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  
  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Handle case where the user is not signed in
  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">
          Please <a href="/sign-in" className="text-green-600 underline">sign in</a> to view your profile.
        </div>
      </div>
    );
  }

  // Display the user's profile information
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Your Profile</h1>
        
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email: </span>
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Username: </span>
            {user.username || 'No username set'}
          </p>
        </div>

        <button
          onClick={() => router.push('/profile/upload')}
          className="bg-green-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Upload a Business
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
