'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Path to your Supabase client
import { useRouter } from 'next/navigation';

const CategoryPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch categories from Supabase
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true)
    try {
        const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data);
    }
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
  };
  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-6 text-center ">Categories</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/2 md:w-1/3 outline-none"
        />
        <p className='text-center text-gray-500'>{loading ? 'loading...' : null}</p>
      </div>
      {filteredCategories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.category_id}
              onClick={() => router.push(`/categories/${category.category_id}`)}
              className="bg-white hover:cursor-pointer rounded-lg shadow-lg p-5 flex flex-col items-start transition-transform transform hover:scale-105"
            >
              {/* SVG Icon for each category */}
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a1 1 0 011 1v6a1 1 0 11-2 0V3a1 1 0 011-1z" />
                  <path d="M4.293 6.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{category.name}</h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
