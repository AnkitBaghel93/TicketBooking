import React, { useState, useEffect } from 'react';
import {
  FaChartBar,
  FaHeadset,
  FaTools,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from 'react-icons/fa';

const Dashboard = () => {
  const [rating, setRating] = useState(4.5);
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalSolved: 0,
    totalInProgress: 0,
    totalAwaitingApproval: 0,
    techSupportCount: 0,
    opTeamCount: 0,
  });

useEffect(() => {
  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found. User not authenticated.');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [ticketRes, approvalRes, userRes] = await Promise.all([
        fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets', { headers }),
        fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/approvals', { headers }),
        fetch('https://ticketbooking-backend-uq35.onrender.com/api/users', { headers }),
      ]);

      const tickets = await ticketRes.json();
      const approvals = await approvalRes.json();
      const users = await userRes.json();

      // console.log('Tickets:', tickets);
      // console.log('Approvals:', approvals);
      // console.log('Users:', users);

      // Prevent crash if any response is not an array
      const isArray = (data) => Array.isArray(data);

      if (!isArray(tickets) || !isArray(approvals) || !isArray(users)) {
        console.error('One of the API responses is not an array');
        return;
      }

      const totalTickets = tickets.length;
      const totalSolved = tickets.filter((t) => t.status === 'Completed').length;
      const totalInProgress = tickets.filter((t) => t.status === 'In Progress').length;
      const totalAwaitingApproval = approvals.length;
      const techSupportCount = users.filter((u) => u.role === 'technical').length;
      const opTeamCount = users.filter((u) => u.role === 'operation').length;

      setStats({
        totalTickets,
        totalSolved,
        totalInProgress,
        totalAwaitingApproval,
        techSupportCount,
        opTeamCount,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  fetchStats();
}, []);


  const handleStarClick = (value) => setRating(value);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 px-11">Dashboard</h1>

     
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 px-11">
        {[
          {
            label: 'Total Tickets',
            value: stats.totalTickets,
            color: 'bg-blue-500',
            textColor: 'text-white',
          },
          {
            label: 'Total Solved',
            value: stats.totalSolved,
            color: 'bg-green-400',
            textColor: 'text-white',
          },
          {
            label: 'Total Awaiting Approval',
            value: stats.totalAwaitingApproval,
            color: 'bg-red-400',
            textColor: 'text-white',
          },
          {
            label: 'Total in Progress',
            value: stats.totalInProgress,
            color: 'bg-yellow-300',
            textColor: 'text-black',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} ${card.textColor} p-5 rounded-xl shadow-lg text-center hover:scale-105 transition duration-300`}
          >
            <h2 className="text-sm font-semibold">{card.label}</h2>
            <p className="text-4xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Graph + Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 px-11">
        <div className="bg-teal-300 p-6 rounded-xl shadow-lg flex items-center justify-center h-56">
          <FaChartBar className="text-8xl text-blue-900" />
        </div>
        <div className="bg-teal-300 p-6 rounded-xl shadow-lg flex items-center justify-around h-56">
          <div className="text-center">
            <FaHeadset className="text-4xl mx-auto mb-2" />
            <p className="text-lg font-semibold">{stats.techSupportCount}</p>
            <p className="text-sm">Technical Supports</p>
          </div>
          <div className="text-center">
            <FaTools className="text-4xl mx-auto mb-2" />
            <p className="text-lg font-semibold">{stats.opTeamCount}</p>
            <p className="text-sm">Operation Team</p>
          </div>
        </div>
      </div>

      {/* Feedback */}
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
