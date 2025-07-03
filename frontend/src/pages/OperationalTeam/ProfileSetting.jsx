import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSetting = () => {
  const [teamMember, setTeamMember] = useState({});
  const [feedback, setFeedback] = useState({ message: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setTeamMember(storedUser || {});
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, message: e.target.value });
  };

  const handleRatingChange = (star) => {
    setFeedback({ ...feedback, rating: star });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://ticketbooking-backend-uq35.onrender.com/api/feedback', feedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmitted(true);
      console.log('Feedback submitted by operational team:', feedback);
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  return (
    <div className="p-6 bg-[rgba(85,214,194,0.68)] min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">Operational Team Profile</h2>
          <div className="text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-2" />
          </div>
          <p className="mb-2"><strong>Name:</strong> {teamMember.username}</p>
          <p className="mb-2"><strong>Email:</strong> {teamMember.email}</p>
          <p className="mb-2"><strong>Role:</strong> {teamMember.role}</p>
          <p className="mb-2"><strong>Department:</strong> Operations</p>
          <p className="mb-2"><strong>Contact:</strong> {teamMember.contact || 'N/A'}</p>
        </div>

        {/* Feedback Section */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h3 className="text-lg font-semibold mb-3 text-center">Submit Feedback</h3>
          <textarea
            placeholder="Enter your feedback"
            className="w-full p-2 border rounded mb-3"
            value={feedback.message}
            onChange={handleFeedbackChange}
          />
          <div className="flex justify-center mb-3">
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
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
          {submitted && <p className="text-green-600 text-sm mt-2 text-center">Feedback submitted!</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
