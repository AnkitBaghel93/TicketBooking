import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const Performance = () => {
  const [teamData, setTeamData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

useEffect(() => {
  const fetchTickets = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/technical', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const tickets = await res.json();

      const grouped = {};
      tickets.forEach(ticket => {
        const person = ticket.assignedTo || 'Unassigned';
        if (!grouped[person]) grouped[person] = [];
        grouped[person].push(ticket);
      });

      const members = Object.entries(grouped).map(([person, tickets]) => {
        const solved = tickets.filter(t => t.status?.toLowerCase() === 'completed' || t.status?.toLowerCase() === 'closed').length;
        const pending = tickets.filter(t => t.status?.toLowerCase() === 'pending' || t.status?.toLowerCase() === 'on hold').length;
        const inProgress = tickets.filter(t => t.status?.toLowerCase() === 'in progress').length;

        return {
          name: person,
          tickets,
          total: tickets.length,
          solved,
          pending,
          inProgress
        };
      });

      setTeamData(members);
    } catch (err) {
      console.error('Error fetching tickets:', err.message);
    }
  };

  fetchTickets();
  const interval = setInterval(fetchTickets, 1000); // refresh every 1 seconds
  return () => clearInterval(interval);
}, []);




  const capitalizeName = (name) => {
  return name
    ?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


  return (
    <div className="p-6 md:p-10 bg-teal-200 min-h-screen -m-4">
      <h1 className="text-3xl font-bold mb-6 px-6">Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Selected Member */}
        <div className="md:col-span-2">
          {selectedMember ? (
            <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <FaUserCircle className="text-8xl text-gray-600" />
              <div className="flex-1 space-y-4">
<h2 className="text-xl font-semibold">{capitalizeName(selectedMember.name)}</h2>
                <div className="border border-blue-400 p-2 rounded-md w-fit text-sm">
                  <p>Contact No: N/A</p>
                  <p>Department: Technical</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-md text-sm w-full max-w-xs">
                  <p className="mb-2 font-medium">Total Tickets: <span className="font-bold float-right">{selectedMember.total}</span></p>
                  <hr />
                  <p className="my-2">Ticket Solved: <span className="float-right">{selectedMember.solved}</span></p>
                  <p className="my-2">Ticket Pending: <span className="float-right">{selectedMember.pending}</span></p>
                  <p className="my-2">Ticket In Progress: <span className="float-right">{selectedMember.inProgress}</span></p>
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
          ) : (
            <p className="text-center text-gray-500">Select a team member to view details</p>
          )}
        </div>

        {/* Right: Team List */}
        <div className="space-y-6">
          {teamData.map((member, index) => (
            <div key={index} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow">
              <FaUserCircle className="text-4xl text-gray-600" />
              <div className="flex-1">
                <p className="font-medium">{capitalizeName(member.name)}</p>

                <button
                  onClick={() => setSelectedMember(member)}
                  className="mt-2 bg-teal-400 text-white px-3 py-1 rounded hover:bg-teal-500 transition text-sm"
                >
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
