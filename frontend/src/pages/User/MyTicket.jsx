import React, { useEffect, useState } from 'react';
import TicketDetails from './TicketDetails';

const MyTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/tickets/my-tickets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err.message);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (id, field, value) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === id ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleRate = (ticketId, star) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, rate: star } : ticket
      )
    );
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.ticketNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold">My Tickets</h2>
        <input
          type="text"
          placeholder="Search by Ticket No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-64"
        />
      </div>

      {filteredTickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-base">
                <th className="p-2 border w-1/6">Ticket No</th>
                <th className="p-2 border w-1/6">Subject</th>
                <th className="p-2 border w-1/6">Status</th>
                <th className="p-2 border w-1/6">Supported By</th>
                <th className="p-2 border w-1/6">Date</th>
                <th className="p-2 border w-1/6">Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="text-center hover:bg-gray-100 text-sm md:text-base">
                  <td
                    className="p-2 border text-blue-600 underline cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    {ticket.ticketNo}
                  </td>
                  <td className="p-2 border">{ticket.subject}</td>
                  <td className="p-2 border">{ticket.status || 'Pending'}</td>

                  <td className="p-2 border">
                    <input
                      type="text"
                      value={ticket.supportedBy || ''}
                      onChange={(e) =>
                        handleEdit(ticket._id, 'supportedBy', e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full text-xs md:text-sm"
                    />
                  </td>

                  <td className="p-2 border">{ticket.date}</td>

                  <td className="p-2 border">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-base ${
                          star <= (ticket.rate || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                        onClick={() => handleRate(ticket._id, star)}
                      >
                        ★
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Ticket Modal */}
      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default MyTicket;
