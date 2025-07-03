import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-300">
      <div className="w-[400px] p-8 bg-cyan-100 border border-blue-500 rounded-md shadow-md text-center">
        <p className="mb-6 text-sm">
          Don’t worry. Enter your email below and we will <br />
          send you a link to change password.
        </p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-400 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>

        <div className="mt-4">
          <Link
            to="/signin"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
