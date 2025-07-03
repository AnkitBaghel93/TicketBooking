import React from 'react';
import {  useLocation , useNavigate} from 'react-router-dom';

const TicketDetails = () => {
   const navigate = useNavigate();
 
  const location = useLocation();
  const ticket = location.state?.ticket;

  if (!ticket) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Ticket data not found.
      </div>
    );
  }

    const handleClose = () => {
   
    navigate('/operation/tickets'); 
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 border shadow-lg bg-white rounded">
      <h1 className="text-2xl font-bold mb-4">My Ticket - Close Ticket</h1>

      <div className="bg-teal-300 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 space-y-4">
            <input
              type="text"
              value={ticket.number}
              readOnly
              className="w-full px-3 py-2 border rounded-xl bg-white"
              placeholder="Ticket No."
            />
            <input
              type="text"
              placeholder="Team name"
              className="w-full px-3 py-2 border rounded-xl"
            />
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Team Member"
                className="flex-1 px-3 py-2 border rounded-xl"
              />
              <span className="text-2xl">👥</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <textarea
              placeholder="Remark"
              className="w-full h-full px-3 py-2 border rounded-xl resize-none"
              rows="6"
            ></textarea>
          </div>
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-6">
          <button  onClick={handleClose} className="px-6 py-2 bg-gray-700 text-white rounded-2xl hover:bg-gray-900">
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
