import React from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const Performance = () => {
  const teamMembers = [
    { name: 'Operation Name 1' },
    { name: 'Operation Name 2' },
    { name: 'Operation Name 3' }
  ];

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left section */}
        <div className="md:col-span-2 bg-gray-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Profile Avatar */}
          <FaUserCircle className="text-8xl text-gray-600" />

          <div className="flex-1 space-y-4">
            {/* Name */}
            <h2 className="text-xl font-semibold">Operation Name</h2>

            {/* Contact Info Box */}
            <div className="border border-blue-400 p-2 rounded-md w-fit text-sm">
              <p>Contact No: 0123456789</p>
              <p>Department: ABC</p>
            </div>

            {/* Ticket Stats */}
            <div className="bg-white p-4 rounded-md shadow-md text-sm w-full max-w-xs">
              <p className="mb-2 font-medium">Total Ticket Handle: <span className="font-bold float-right">5</span></p>
              <hr />
              <p className="my-2">Ticket Solved: <span className="float-right">2</span></p>
              <p className="my-2">Ticket Pending: <span className="float-right">1</span></p>
              <p className="my-2">Ticket in progress: <span className="float-right">2</span></p>
              <p className="mt-4 flex items-center">
                Rating:
                <span className="ml-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="inline" />
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right section: Other team members */}
        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow">
              <FaUserCircle className="text-4xl text-gray-600" />
              <div className="flex-1">
                <p className="font-medium">{member.name}</p>
                <button className="mt-2 bg-teal-400 text-white px-3 py-1 rounded hover:bg-teal-500 transition text-sm">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
