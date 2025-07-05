import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaFacebook , FaGoogle } from 'react-icons/fa';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://ticketbooking-backend-uq35.onrender.com/api/auth/signin',
        formData
      );
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      login(user, token);

      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'operation':
          navigate('/operation/dashboard');
          break;
        case 'technical':
          navigate('/technical/dashboard');
          break;
        default:
          navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-300 p-4">
      <div className="w-[400px] p-8 bg-cyan-100 border border-blue-500 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 italic">Helpdesk System</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link to="/forgot-password" className="text-red-600 hover:underline">
            Forgot password
          </Link>
          <Link to="/signup" className="text-black hover:underline">
            Sign Up
          </Link>
        </div>

                <a
  href="https://ticketbooking-backend-uq35.onrender.com/api/auth/google"
  className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 mt-4"
>
  <FaGoogle className="text-lg" />
  Continue with Google
</a>

        {/* Facebook login button */}
        <a
          href="https://ticketbooking-backend-uq35.onrender.com/api/auth/facebook"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 mt-4"
        >
          <FaFacebook className="text-lg" />
          Continue with Facebook
        </a>


        
      </div>
    </div>
  );
};

export default SignIn;
