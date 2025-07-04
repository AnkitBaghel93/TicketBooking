import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaStar } from 'react-icons/fa';

const ProfileSetting = () => {
  const [user, setUser] = useState({});
  const [feedback, setFeedback] = useState({ message: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser || {});
  }, []);

  const handleRatingChange = (star) => {
    setFeedback({ ...feedback, rating: star });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback:', feedback);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-teal-200  px-4 py-8 -m-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 mx-10 my-2">User Profile</h1>
<div className='flex flex-col items-center justify-center'>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl ">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 flex flex-col items-center relative min-h-[300px]">
          <div className="absolute top-4 right-4 text-gray-600 cursor-pointer">
            <FaEdit />
          </div>
          <FaUser className="text-5xl text-gray-500 mb-4" />
          <div className="text-center space-y-1 text-sm">
            <p><strong>Username:</strong> {user.username || 'Operation Name'}</p>
            <p><strong>Contact:</strong> {user.contact || '0123456789'}</p>
            <p><strong>Email:</strong> {user.email || 'user@example.com'}</p>
            <p><strong>Department:</strong> {user.department || 'Technical'}</p>
          </div>
        </div>

        {/* Feedback Box */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-lg font-bold mb-4 text-center">Give Your Feedback</h3>
            <textarea
              className="w-full border rounded p-2 mb-4 text-sm"
              placeholder="[Lorem Ipsum]"
              rows={3}
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
            />
            <div className="flex justify-center mb-3 text-yellow-500 text-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${star <= feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
            >
              Submit Feedback
            </button>
            {submitted && (
              <p className="text-green-600 text-sm text-center mt-2">Feedback submitted!</p>
            )}
          </div>
        </div>
      </div>
</div>

    </div>
  );
};

export default ProfileSetting;
