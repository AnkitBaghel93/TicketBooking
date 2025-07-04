import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    awaiting: 0,
    inProgress: 0,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/tickets/my-tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const tickets = await res.json();

        const total = tickets.length;
        const completed = tickets.filter(t => t.status?.toLowerCase() === 'completed').length;
        const awaiting = tickets.filter(t => t.status?.toLowerCase() === 'pending').length;
        const inProgress = tickets.filter(t => t.status?.toLowerCase() === 'in progress').length;

        setStats({ total, completed, awaiting, inProgress });
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
      }
    };

    fetchTickets();
  }, []);

  const cards = [
    { label: 'Total Tickets', count: stats.total, bg: 'bg-blue-500' },
    { label: 'Total Solved', count: stats.completed, bg: 'bg-green-500' },
    { label: 'Total Awaiting Approval', count: stats.awaiting, bg: 'bg-red-500' },
    { label: 'Total in Progress', count: stats.inProgress, bg: 'bg-yellow-400' },
  ];

  return (
    <div className="min-h-screen p-6 -m-4 bg-gray-100" style={{ backgroundColor: 'rgba(85, 214, 194, 0.68)' }}>
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded shadow-lg text-white p-4 text-center ${card.bg}`}
          >
            <h3 className="text-md font-medium mb-2">{card.label}</h3>
            <p className="text-3xl font-bold">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
