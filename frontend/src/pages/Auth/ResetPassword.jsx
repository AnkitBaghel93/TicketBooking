import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/signin'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200">
      <div className="w-[400px] p-8 bg-white border border-green-500 rounded-md shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-400 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </form>

        {message && <p className="text-green-700 text-sm mt-3">{message}</p>}
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
