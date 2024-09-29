'use client'
import Link from "next/link";

export default function Home() {
  return (
    <>

      <main className="bg-white">
        {/* Hero Section */}
        <section className="hero bg-gradient-to-r from-white to-blue-200 py-20 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold text-gray-800">
              Your Trusted Platform for Honest Reviews
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Join our community and share your experiences with the world.
            </p>
            <div className="mt-8">
              <Link href={`/categories`} >
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg mr-4">
                Start Reviewing
              </button>
              </Link>
              
              <button className="bg-yellow-500 text-white py-2 px-6 rounded-lg">
                Read Reviews
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-center text-gray-800">Features</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-3 3m0 0l-3-3m3 3V10a6 6 0 0112 0v7m-6-8a4 4 0 00-4 4v1" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Write Detailed Reviews</h3>
                <p className="mt-2 text-gray-600">
                  Share your honest experiences and help others make informed decisions.
                </p>
              </div>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Browse Honest Reviews</h3>
                <p className="mt-2 text-gray-600">Explore thousands of real reviews on products and services.</p>
              </div>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 9l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Rate Products & Services</h3>
                <p className="mt-2 text-gray-600">Use our rating system to evaluate your favorite products.</p>
              </div>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Join the Community</h3>
                <p className="mt-2 text-gray-600">Connect with like-minded users to share and discover reviews.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-center text-gray-800">How It Works</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM12 15v7m0 0H7m5 0h5" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Sign Up</h3>
                <p className="mt-2 text-gray-600">Create an account to start reviewing or browsing reviews.</p>
              </div>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l3 3 4-4m4 4l2 2 5-5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h1v7H3v-7h11zM5 17h6" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Browse Products</h3>
                <p className="mt-2 text-gray-600">Find products or services that interest you.</p>
              </div>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11v4M16 11v4M12 7v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 19h12M6 17h12" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Write a Review</h3>
                <p className="mt-2 text-gray-600">Share your thoughts and experiences to help others.</p>
              </div>
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4" />
                </svg>
                <h3 className="text-xl font-bold mt-4 text-gray-800">Engage & Rate</h3>
                <p className="mt-2 text-gray-600">Rate and interact with reviews to help others.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Reviews Section */}
        <section className="popular-reviews py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-center text-gray-800">Popular Reviews</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Review Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800">Great Service!</h3>
                <p className="mt-2 text-gray-600">
                {'"'}Amazing product! The delivery was fast and the quality exceeded my expectations.{'"'}
                </p>
                <div className="mt-4">
                  <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                </div>
              </div>

              {/* Add more review cards as needed */}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta py-20 bg-green-500 text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold">Ready to Share Your Thoughts?</h2>
            <p className="mt-4 text-xl">
              Join our community and help others make informed decisions with your reviews.
            </p>
            <div className="mt-8">
            <Link href={`/categories`} >
                <button className="bg-white text-green-500 py-2 px-6 rounded-lg">
                Get started
              </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
