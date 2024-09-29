'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/supabase';
import { useRouter } from 'next/navigation';

const BusinessPage = ({ params }) => {
  const categoryId = params.category; // Get the category_id from params
  const [businesses, setBusinesses] = useState([]); // State to hold businesses
  const [loading, setLoading] = useState(true); // State to manage loading
  const router = useRouter();
  // Fetch businesses based on category_id
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true); // Start loading
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('category_id', categoryId); // Filter by category_id

      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(data);
      }
      setLoading(false); // End loading
    };

    fetchBusinesses();
  }, [categoryId]); // Re-run when categoryId changes

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
         {businesses.length === 0 ? null : <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">{loading ? null : businesses[0].category } </h1>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
        
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.length === 0 ? (
            <p className="text-center text-gray-500">No businesses found in this category.</p>
          ) : (
            businesses.map((business) => (
              <div key={business.business_id} className="bg-white hover:cursor-pointer rounded-lg shadow-lg p-5 flex flex-col items-start transition-transform transform hover:scale-105" onClick={() => router.push(`${categoryId}/${business.business_id}`)}>
                <h2 className="text-2xl font-semibold text-gray-800">{business.name}</h2>
                <p className="text-gray-600 mt-1">{business.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessPage;
