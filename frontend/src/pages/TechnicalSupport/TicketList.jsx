import React, { useState, useEffect } from 'react';

const getStatusStyle = (status) => {
  switch (status) {
    case 'in Progress': return 'bg-green-500 text-white';
    case 'pending': return 'bg-blue-500 text-white';
    case 'completed': return 'bg-black text-white';
    default: return '';
  }
};

const TechnicalTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [personInput, setPersonInput] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/technical', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setTickets(data);
        else console.error(data.message);
      } catch (err) {
        console.error('Error fetching technical tickets:', err);
      }
    };
    fetchTickets();
  }, []);

  const handleEditClick = (ticket) => {
    setEditingId(ticket._id);
    setPersonInput(ticket.assignedTo || '');
  };

  const handleSaveClick = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://ticketbooking-backend-uq35.onrender.com/api/tickets/${ticketId}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedTo: personInput }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTickets((prev) =>
          prev.map((ticket) => (ticket._id === updated._id ? updated : ticket))
        );
        setEditingId(null);
        setPersonInput('');
      } else {
        console.error("Failed to update");
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleStatusChange = (e) => {
    setStatusUpdate(e.target.value);
  };

  const handleStatusUpdate = async () => {
    if (!selectedTicket) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://ticketbooking-backend-uq35.onrender.com/api/tickets/${selectedTicket._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: statusUpdate }),
      });

      if (res.ok) {
        const updated = await res.json();
        setTickets((prev) =>
          prev.map((ticket) => (ticket._id === updated._id ? updated : ticket))
        );
        setSelectedTicket(null);
        setStatusUpdate('');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticketNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visibleTickets = filteredTickets.slice(0, entriesToShow);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto mt-20 border rounded-lg shadow-md bg-white overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Technical Support Tickets</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Ticket No..."
          className="border px-3 py-2 rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(Number(e.target.value))}
          className="border px-2 py-2 rounded w-full sm:w-auto"
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n} entries</option>
          ))}
        </select>
      </div>

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
              <th className="border px-3 py-2">Person</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.map(ticket => (
              <tr key={ticket._id} className="text-center">
                <td
                  className="border px-3 py-2 text-blue-600 underline cursor-pointer"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setStatusUpdate(ticket.status);
                  }}
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
                <td className="border px-3 py-2">
                  {editingId === ticket._id ? (
                    <input
                      type="text"
                      value={personInput}
                      onChange={(e) => setPersonInput(e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    ticket.assignedTo || '—'
                  )}
                </td>
                <td className="border px-3 py-2">
                  {editingId === ticket._id ? (
                    <button
                      onClick={() => handleSaveClick(ticket._id)}
                      className="text-green-600 font-bold"
                    >
                      💾 Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(ticket)}
                      className="text-blue-600 font-bold"
                    >
                      ✏️ Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Ticket Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Ticket No:</strong> {selectedTicket.ticketNo}</p>
              <p><strong>Subject:</strong> {selectedTicket.subject}</p>
              <p><strong>Category:</strong> {selectedTicket.category}</p>
              <p><strong>Priority:</strong> {selectedTicket.priority}</p>
              <p><strong>Date:</strong> {selectedTicket.date?.substring(0, 10)}</p>
              <p><strong>Assigned To:</strong> {selectedTicket.assignedTo || '—'}</p>

              <div className="mt-3">
                <label className="font-semibold">Status:</label>
                <select
                  value={statusUpdate}
                  onChange={handleStatusChange}
                  className="ml-2 border px-2 py-1 rounded"
                >
                  <option value="in Progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={handleStatusUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Status
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

export default TechnicalTicketList;
