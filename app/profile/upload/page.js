'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/supabase';

const BusinessUploadPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState('');
  // Fetch available categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let categoryId = '';
  
    // Set category_id based on selected category
    if (category === 'Education') {
      categoryId = '1';
    } else if (category === 'Finance_and_Banking') {
      categoryId = '2';
    } else if (category === 'Restaurants') {
      categoryId = '3';
    } else if (category === 'Social_Media_Marketplace') {
      categoryId = '4';
    }
  
    // Insert business with category_id
    const { data, error } = await supabase
      .from('businesses')
      .insert([{ name, description, category, category_id: categoryId }]);
  
    if (error) {
      console.error('Error uploading business:', error);
    } else {
      alert('Business added successfully!');
      setName('');
      setDescription('');
      setCategory('');
    }
  
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Upload Business</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Business Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Business'}
        </button>
      </form>
    </div>
  );
};

export default BusinessUploadPage;
