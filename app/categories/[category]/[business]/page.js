'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/supabase';
import { useUser } from '@clerk/nextjs';

const BusinessPage = ({ params }) => {
  const business_id = params.business; // Assuming this is coming from the URL
  const { user } = useUser();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [user_id, setUserId] = useState('');
  const [name, setName] = useState('');
  const [submitReview, setSubmittingReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch business details
  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('business_id', business_id)
        .single();
      if (error) {
        console.error('Error fetching business:', error);
      } else {
        setBusiness(data);
      }
    };

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('business_id', business_id);
      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data);
      }
    };

    fetchBusiness();
    fetchReviews();
  }, [business_id]);

  // Set user info on user change
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You have to login first.');
      return;
    }
    if (rating === 0) {
      alert('Select a rating.');
      return;
    }
    setSubmittingReview(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{ business_id, rating, comment, user_id, name }]);
      if (error) {
        console.error('Error submitting review:', error);
      } else {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .eq('business_id', business_id);
        setReviews(data);
        setRating(0);
        setComment('');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittingReview(false);
    }
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-${rating > index ? 'yellow' : 'gray'}-500 text-xl hover:text-yellow-500 cursor-pointer transition duration-200`}
        onClick={() => setRating(index + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {business ? (
        <>
          <h1 className="text-5xl font-bold text-green-600 mb-6 text-center">{business.name}</h1>
          <p className="mb-8 text-gray-700 text-center max-w-2xl">{business.description}</p>

          <h2 className="text-3xl font-semibold mb-6 text-green-500">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600 mb-6">No reviews yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
              {reviews.map((review) => (
                <div
                  key={review.review_id}
                  className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-lg text-gray-800">{review.name}</strong>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white rounded-lg px-6 py-2 shadow-lg hover:bg-green-700 transition duration-200"
          >
            Leave a Review
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 font-medium text-gray-600">Rating:</label>
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          onClick={() => setRating(index + 1)}
                          className={`cursor-pointer text-${rating > index ? 'yellow' : 'gray'}-500 text-2xl hover:text-yellow-500 transition duration-200`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-600">Comment:</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 mb-4 w-full h-24 resize-none"
                      placeholder="Write your review here..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white rounded-lg px-4 py-2 shadow-lg hover:bg-green-700 transition duration-200"
                  >
                    {!submitReview ? 'Submit Review' : 'Submitting...'}
                  </button>
                </form>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500 mt-4 underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default BusinessPage;
