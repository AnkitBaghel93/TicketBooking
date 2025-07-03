import React, { useState, useEffect } from 'react';

const Database = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://ticketbooking-backend-uq35.onrender.com/api/users');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const username = user?.username || '';
    const email = user?.email || '';
    const role = user?.role || '';

    const matchesSearch =
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === '' || role.toLowerCase().trim() === roleFilter.toLowerCase().trim();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans">
      <h2 className="text-2xl font-bold mb-6">User Database</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Entries per page */}
        <div className="flex items-center gap-2">
          <label>Show:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span>Entries</span>
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2">
          <label>Role:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="operation">Operation</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Username</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(0, rowsPerPage).map((user, index) => (
              <tr key={user?._id || index} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{user?._id}</td>
                <td className="border p-2">{user?.username}</td>
                <td className="border p-2">{user?.email}</td>
                <td className="border p-2 capitalize">{user?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-700">
        Showing {Math.min(rowsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
      </div>
    </div>
  );
};

export default Database;
