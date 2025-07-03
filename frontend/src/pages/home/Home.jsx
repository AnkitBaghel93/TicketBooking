import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-teal-300">
      <div className="text-center bg-white/60 p-10 rounded-md shadow-lg border border-blue-200 w-[90%] max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Welcome to the Assignment by <br className="hidden sm:block" />
          <span className="text-teal-700">WeAnalyz Technologies</span>
        </h1>
        <Link
          to="/signup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
        >
          Start Booking Your Ticket
        </Link>
      </div>
    </div>
  );
};

export default Home;
