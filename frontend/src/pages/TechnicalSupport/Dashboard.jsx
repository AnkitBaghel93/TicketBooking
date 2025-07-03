import React, { useState, useEffect } from 'react';
import { FaChartBar, FaHeadset, FaTools, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [rating, setRating] = useState(4.5);
  const [stats, setStats] = useState({
    total: 0,
    solved: 0,
    inProgress: 0,
    awaiting: 0,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/technical', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const tickets = await res.json();

        const total = tickets.length;
        const solved = tickets.filter(t => t.status?.toLowerCase() === 'completed').length;
        const inProgress = tickets.filter(t => t.status?.toLowerCase() === 'in progress').length;
        const awaiting = tickets.filter(t => t.status?.toLowerCase() === 'pending').length;

        setStats({ total, solved, inProgress, awaiting });
      } catch (err) {
        console.error('Failed to fetch technical tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const cards = [
    { label: 'Total Tickets', value: stats.total, color: 'bg-blue-500', textColor: 'text-white' },
    { label: 'Total Solved', value: stats.solved, color: 'bg-green-400', textColor: 'text-white' },
    { label: 'Total Awaiting Approval', value: stats.awaiting, color: 'bg-red-400', textColor: 'text-white' },
    { label: 'Total in Progress', value: stats.inProgress, color: 'bg-yellow-300', textColor: 'text-black' },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 px-11">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 px-11">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} ${card.textColor} p-5 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105`}
          >
            <h2 className="text-sm font-semibold">{card.label}</h2>
            <p className="text-4xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 px-11">
        <div className="bg-teal-300 p-6 rounded-xl shadow-lg flex items-center justify-center h-56">
          <FaChartBar className="text-8xl text-blue-900" />
        </div>
        <div className="bg-teal-300 p-6 rounded-xl shadow-lg flex items-center justify-around h-56">
          <div className="text-center">
            <FaHeadset className="text-4xl mx-auto mb-2" />
            <p className="text-lg font-semibold">3</p>
            <p className="text-sm">Technical Supports</p>
          </div>
          <div className="text-center">
            <FaTools className="text-4xl mx-auto mb-2" />
            <p className="text-lg font-semibold">4</p>
            <p className="text-sm">Operation Team</p>
          </div>
        </div>
      </div>

      <div className="bg-teal-300 rounded-xl shadow-lg p-6 max-w-md mx-auto text-center">
        <h3 className="text-lg font-semibold mb-3">Customer Feedback</h3>
        <div className="flex justify-center text-yellow-500 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
            >
              {rating >= star ? (
                <FaStar />
              ) : rating >= star - 0.5 ? (
                <FaStarHalfAlt />
              ) : (
                <FaRegStar />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
