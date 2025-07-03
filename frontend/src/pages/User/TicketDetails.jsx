import React from 'react';

const TicketDetails = ({ ticket, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <h2 className="text-lg font-bold text-center mb-4">Ticket Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Ticket No:</strong> {ticket.ticketNo}</p>
          <p><strong>Date:</strong> {ticket.date}</p>
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Department:</strong> {ticket.department}</p>
          <hr />
          <p><strong>Subject:</strong> {ticket.subject}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Category:</strong> {ticket.category}</p>
          <p><strong>Type:</strong> {ticket.type}</p>
          <p><strong>Priority:</strong> {ticket.priority}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Attachment:</strong> {ticket.attachment || 'None'}</p>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
