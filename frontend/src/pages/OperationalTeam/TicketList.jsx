import React, { useState, useEffect } from 'react';

const getStatusStyle = (status) => {
  switch (status) {
    case 'In Progress': return 'bg-green-500 text-white';
    case 'Pending': return 'bg-yellow-500 text-white';
    case 'Completed': return 'bg-black text-white';
    default: return '';
  }
};

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch operational tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/tickets/operational', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setTickets(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticketNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visibleTickets = filteredTickets.slice(0, entriesToShow);

  const maxOptions = [10, 25, 50].filter(option => option <= filteredTickets.length);
  if (!maxOptions.includes(filteredTickets.length)) {
    maxOptions.push(filteredTickets.length);
  }

  const handleStatusUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/tickets/${selectedTicket._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: selectedTicket.status })
      });

      if (res.ok) {
        const updated = await res.json();
        setTickets(prev =>
          prev.map(ticket => (ticket._id === updated._id ? updated : ticket))
        );
        setSelectedTicket(null);
      } else {
        const error = await res.json();
        alert('Error updating status: ' + error.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error during status update');
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto mt-20 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Operational Team Tickets</h2>

      {/* Search and Entries */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Find ticket by number"
          className="border px-2 py-1 rounded-md w-full sm:w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <label>Show:</label>
          <select
            className="border px-2 py-1 rounded-md"
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(Number(e.target.value))}
          >
            {maxOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Ticket No.</th>
              <th className="border px-3 py-2">Subject</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Priority</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Assigned</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.length > 0 ? (
              visibleTickets.map(ticket => (
                <tr key={ticket._id} className="text-center">
                  <td
                    className="border px-3 py-2 text-blue-600 underline cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    {ticket.ticketNo}
                  </td>
                  <td className="border px-3 py-2">{ticket.subject}</td>
                  <td className="border px-3 py-2">{ticket.category}</td>
                  <td className="border px-3 py-2">{ticket.priority}</td>
                  <td className="border px-3 py-2">{ticket.date?.substring(0, 10)}</td>
                  <td className="border px-3 py-2">
                    <span className={`px-2 py-1 rounded ${getStatusStyle(ticket.status)}`}>
                      {ticket.status || 'Pending'}
                    </span>
                  </td>
                  <td className="border px-3 py-2 text-xl">🧑‍💼</td>
                  <td className="border px-3 py-2 space-x-2">
                    <button title="Edit">✏️</button>
                    <button title="Delete">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
            <div className="text-left space-y-2 mb-6">
              <p><strong>Ticket No:</strong> {selectedTicket.ticketNo}</p>
              <p><strong>Date:</strong> {selectedTicket.date?.substring(0, 10)}</p>
              <p><strong>Name:</strong> {selectedTicket.name}</p>
              <p><strong>Dept:</strong> {selectedTicket.department}</p>
              <p><strong>Title:</strong> {selectedTicket.subject}</p>
              <p><strong>Description:</strong> {selectedTicket.description}</p>
              <p><strong>Category:</strong> {selectedTicket.category}</p>
              <p><strong>Type:</strong> {selectedTicket.type}</p>
              <p><strong>Priority:</strong> {selectedTicket.priority}</p>
              <div>
                <label className="block text-left font-semibold mb-1">Status:</label>
                <select
                  value={selectedTicket.status}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <p><strong>Attachment:</strong> None</p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleStatusUpdate}
              >
                Update
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
