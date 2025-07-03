import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const NewTicket = () => {
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ticketNo: '',
    date: '',
    name: '',
    department: '',
    subject: '',
    category: '',
    description: '',
    type: '',
    priority: '',
    notRobot: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/tickets/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Ticket created successfully!');
      console.log('Ticket created:', data);
       navigate("/user/my-tickets");
    } else {
      alert(data.message || 'Failed to create ticket');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(85, 214, 194, 0.68)' }}>
      {/* Reverted max-w to 4xl, reduced padding (p-6) */}
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-auto overflow-hidden p-6">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">Create New Ticket</h2> {/* Reduced mb-6 to mb-5 */}
        {/* Reduced space-y-6 to space-y-4 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Top Row: Ticket No, Date, Name, Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"> {/* Adjusted gap-y for less vertical space */}
            <div>
              <label htmlFor="ticketNo" className="block text-sm font-medium text-gray-700 mb-1">Ticket No.</label>
              <input
                type="text"
                id="ticketNo"
                name="ticketNo"
                value={formData.ticketNo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
               
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
            />
          </div>

          {/* Category, Description, Type, Priority */}
          {/* Reduced rows for description, adjusted gap-y */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
<select
  id="category"
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border bg-white"
>
  <option value="">Select Category</option>
  <option value="Technical Support">Technical Support</option>
  <option value="Operational Team">Operational Team</option>
</select>

            </div>
            {/* Description textarea now uses rows="4" */}
            <div className="row-span-2 md:row-span-3"> {/* Adjusted row-span for better responsiveness with fewer rows */}
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4" // Reduced from 6 to 4
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border resize-y"
              ></textarea>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority:</label>
              <input
                type="text"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          {/* reCAPTCHA and Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"> {/* Reduced mt-8 to mt-6 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notRobot"
                name="notRobot"
                checked={formData.notRobot}
                onChange={handleChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="notRobot" className="text-sm font-medium text-gray-700">I'm not a robot</label>
              <div className="border border-gray-300 p-2 rounded bg-gray-50 text-gray-500 text-xs">
                reCAPTCHA<br/>
                Privacy - Terms
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;