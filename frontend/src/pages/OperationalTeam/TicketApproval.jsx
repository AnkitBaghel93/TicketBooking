import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const TicketApproval = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [actions, setActions] = useState({});
  const [assignees, setAssignees] = useState({});

  // Fetch operational tickets from backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/operational', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setTickets(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const filtered = tickets.filter(ticket =>
    ticket.ticketNo?.toLowerCase().includes(search.toLowerCase())
  );

  const visibleTickets = filtered.slice(0, entriesToShow);

  const handleActionChange = (id, value) => {
    setActions(prev => ({ ...prev, [id]: value }));
  };

  const handleAssignChange = (id, value) => {
    setAssignees(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-xl font-bold mb-4">Ticket Approval</h1>

      {/* Search and Show controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find ticket"
            className="border rounded px-3 py-2 w-full"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-500" />
        </div>

        <div className="flex items-center gap-2">
          <label>Show:</label>
          <select
            className="border px-2 py-1 rounded"
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(Number(e.target.value))}
          >
            {[5, 10, 25, 50]
              .filter(n => n <= filtered.length)
              .concat(filtered.length > 0 && ![5, 10, 25, 50].includes(filtered.length) ? [filtered.length] : [])
              .map(n => <option key={n} value={n}>{n}</option>)
            }
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* Tickets Table */}
      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Ticket No.</th>
            <th className="border px-3 py-2">Subject</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Priority</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Action</th>
            <th className="border px-3 py-2">Assign To</th>
          </tr>
        </thead>
        <tbody>
          {visibleTickets.length > 0 ? (
            visibleTickets.map(ticket => (
              <tr key={ticket._id} className="text-center">
                <td className="border px-3 py-2 text-blue-600 underline cursor-pointer">{ticket.ticketNo}</td>
                <td className="border px-3 py-2">{ticket.subject}</td>
                <td className="border px-3 py-2">{ticket.category}</td>
                <td className="border px-3 py-2">{ticket.priority}</td>
                <td className="border px-3 py-2">{ticket.date?.substring(0, 10)}</td>
                <td className="border px-3 py-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={actions[ticket._id] || ''}
                    onChange={(e) => handleActionChange(ticket._id, e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="approve">Approve ✅</option>
                    <option value="reject">Reject ❌</option>
                  </select>
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="text"
                    value={assignees[ticket._id] || ''}
                    onChange={(e) => handleAssignChange(ticket._id, e.target.value)}
                    placeholder="Assignee Name"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-600">
        Showing 1 to {visibleTickets.length} of {filtered.length} entries
      </div>
    </div>
  );
};

export default TicketApproval;
