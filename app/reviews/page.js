'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/supabase';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [businessNames, setBusinessNames] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all reviews and related business names
  useEffect(() => {
    const fetchReviewsAndBusinessNames = async () => {
      // Fetch all reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        setLoading(false);
        return;
      }

      setReviews(reviewsData);

      // Fetch business names for each review based on business_id
      const businessIds = [...new Set(reviewsData.map(review => review.business_id))]; // Get unique business IDs
      const businessNamesMap = {};

      // Fetch each business's name by business_id
      for (const businessId of businessIds) {
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('name')
          .eq('business_id', businessId)
          .single();

        if (businessError) {
          console.error(`Error fetching business name for ID ${businessId}:`, businessError);
        } else {
          businessNamesMap[businessId] = businessData?.name || 'Unknown Business';
        }
      }

      setBusinessNames(businessNamesMap);
      setLoading(false);
    };

    fetchReviewsAndBusinessNames();
  }, []);

  // Helper function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-${rating > index ? 'yellow' : 'gray'}-500`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <section className="popular-reviews py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800">Popular Reviews</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.review_id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                <p className="mt-2 text-gray-600">{review.comment}</p>
                <p className="mt-2 text-gray-500">Reviewed <i className='text-green-600'>{businessNames[review.business_id] || 'Unknown Business'}</i></p>
                <div className="mt-4">
                  {renderStars(review.rating)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;
