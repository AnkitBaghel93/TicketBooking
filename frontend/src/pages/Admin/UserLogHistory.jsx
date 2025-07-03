import React, { useState } from 'react';

const UserLogHistory = () => {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const userLogs = [
    {
      signIn: '130821 / 0800',
      staffId: 'XL000001',
      department: 'OT',
      activity: 'Create Team',
      signOut: '130821 / 0815',
    },
    {
      signIn: '130821 / 0805',
      staffId: '',
      department: '',
      activity: '',
      signOut: '130821 / 0810',
    },
    {}, {}, {}, // Empty rows to simulate 5 rows
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans shadow">
      <h2 className="text-2xl font-bold mb-4">User Log History</h2>

      <div className="flex items-center mb-3 gap-2">
        <label className="font-medium">Show:</label>
        <select
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5, 10, 20].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <span className="ml-1">Entries</span>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="border p-2">No.</th>
              <th className="border p-2">Date/Sign In Time</th>
              <th className="border p-2">Staff ID</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Activity</th>
              <th className="border p-2">Date/Sign Out time</th>
            </tr>
          </thead>
          <tbody>
            {userLogs.slice(0, entriesToShow).map((log, index) => (
              <tr
                key={index}
                className={`${
                  index === 0 ? 'border-2 border-blue-500' : ''
                } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
              >
                <td className="border px-3 py-2 font-medium">{index + 1}.</td>
                <td className="border px-3 py-2">{log.signIn || ''}</td>
                <td className="border px-3 py-2">{log.staffId || ''}</td>
                <td className="border px-3 py-2">{log.department || ''}</td>
                <td className="border px-3 py-2">{log.activity || ''}</td>
                <td className="border px-3 py-2">{log.signOut || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing 1 to {userLogs.length} of {userLogs.length} entries
        </div>
        <div className="space-x-2">
          <button className="px-2 py-1 border rounded bg-gray-100">&lt;&lt;</button>
          <button className="px-2 py-1 border rounded bg-gray-100">1</button>
          <button className="px-2 py-1 border rounded bg-gray-100">&gt;&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default UserLogHistory;
