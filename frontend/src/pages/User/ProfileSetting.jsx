import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSetting = () => {
  const [user, setUser] = useState({});
  const [feedback, setFeedback] = useState({ message: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser || {});
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, message: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/feedback', feedback, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  return (
    <div
      className="p-8 min-h-screen flex justify-center items-start -m-4"
      style={{ backgroundColor: 'rgba(85, 214, 194, 0.68)' }}
    >
      <div className="flex flex-col md:flex-row gap-6 mt-20">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded shadow w-80">
          <h2 className="text-lg font-bold mb-4 text-center">User Profile</h2>
          <div className="text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-2" />
          </div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        {/* Feedback Section */}
        <div className="bg-white p-4 rounded shadow w-80">
          <h3 className="font-semibold mb-2 text-center">Give Your Feedback</h3>
          <textarea
            placeholder="Enter your feedback"
            className="w-full p-2 border rounded mb-2 text-sm"
            value={feedback.message}
            onChange={handleFeedbackChange}
          />

          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xl cursor-pointer ${feedback.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>

          <button
            onClick={submitFeedback}
            className="bg-blue-500 text-white py-1 px-4 rounded w-full"
          >
            Submit Feedback
          </button>

          {submitted && (
            <p className="text-green-600 mt-2 text-center text-sm">Feedback submitted!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
