import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const links = {
    user: [
      { to: '/user/dashboard', label: 'Dashboard' },
      { to: '/user/new-ticket', label: 'New Ticket' },
      { to: '/user/my-tickets', label: 'My Tickets' },
      { to: '/user/profile', label: 'Profile' },
    ],
    admin: [
      { to: '/admin/dashboard', label: 'Dashboard' },
      { to: '/admin/database', label: 'Database' },
      { to: '/admin/settings', label: 'Settings' },
      { to: '/admin/logs', label: 'User Logs' },
      { to: '/admin/profile', label: 'Profile' },
    ],
    // Add for other roles...
  };

  return (
    <aside className="sidebar">
      <h2>HelpDesk</h2>
      {links[user.role]?.map(link => (
        <NavLink key={link.to} to={link.to} className="sidebar-link">
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
