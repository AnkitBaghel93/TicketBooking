import React, { useState, useEffect } from 'react';
import { FaChartBar, FaHeadset, FaTools, FaStar } from 'react-icons/fa';

const Dashboard = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [approvalActions, setApprovalActions] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/operational', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setTickets(data);
        else console.error(data.message);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };

    // Optionally fetch approval actions if stored or available
    const fetchApprovals = () => {
      const stored = localStorage.getItem('approvals');
      if (stored) {
        try {
          setApprovalActions(JSON.parse(stored));
        } catch {}
      }
    };

    fetchTickets();
    fetchApprovals();
  }, []);

  // Derived counts
  const totalTickets = tickets.length;
  const totalSolved = tickets.filter(t => t.status === 'Completed').length;
  const totalInProgress = tickets.filter(t => t.status === 'In Progress').length;
  const totalAwaitingApproval = approvalActions.filter(a => a.action === 'approve').length;

  const handleClick = (value) => {
    setRating(value);
    console.log(`Selected Rating: ${value}`);
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Top stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Tickets" value={totalTickets} bg="bg-blue-500" text="text-white" />
        <StatCard label="Total Solved" value={totalSolved} bg="bg-green-400" text="text-white" />
        <StatCard label="Total Awaiting Approval" value={totalAwaitingApproval} bg="bg-red-400" text="text-white" />
        <StatCard label="Total In Progress" value={totalInProgress} bg="bg-yellow-300" text="text-black" />
      </div>

      {/* Graph and Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-teal-300 rounded shadow flex items-center justify-center h-48">
          <FaChartBar className="text-9xl text-blue-900" />
        </div>
        <div className="bg-teal-300 rounded shadow flex flex-col items-center justify-center h-48 text-center space-y-4">
          <TeamCard icon={<FaHeadset />} label="3 Technical Supports" />
          <TeamCard icon={<FaTools />} label="4 Operation Team" />
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-teal-300 rounded shadow p-4 text-center w-full max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-2">Customer Feedback</h3>
        <div className="text-yellow-500 text-2xl flex items-center justify-center">
          {[1, 2, 3, 4, 5].map(value => (
            <FaStar
              key={value}
              className={`cursor-pointer ${((hover || rating) >= value) ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => handleClick(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
        {rating > 0 && <p className="text-sm text-gray-700 mt-2">You rated {rating} star{rating > 1 ? 's' : ''}</p>}
      </div>
    </div>
  );
};

// Helper card components
const StatCard = ({ label, value, bg, text }) => (
  <div className={`${bg} ${text} rounded shadow p-4 text-center`}>
    <h2 className="font-semibold">{label}</h2>
    <p className="text-3xl mt-2">{value}</p>
  </div>
);

const TeamCard = ({ icon, label }) => (
  <div>
    <div className="text-3xl inline mr-2">{icon}</div>
    <span className="text-lg font-semibold">{label}</span>
  </div>
);

export default Dashboard;
