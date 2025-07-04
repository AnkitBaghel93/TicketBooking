import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/signin');
  };

  const handleLinkClick = () => {
    // Close menu after clicking on a link (mobile)
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const renderLinks = () => {
    const role = user?.role;
    const baseRoutes = {
      user: ['/user/dashboard', '/user/new-ticket', '/user/my-tickets', '/user/profile'],
      operation: ['/operation/dashboard', '/operation/tickets', '/operation/tickets-approval', '/operation/performance', '/operation/profile'],
      technical: ['/technical/dashboard', '/technical/tickets', '/technical/performance', '/technical/profile'],
      admin: ['/admin/dashboard', '/admin/database', '/admin/settings', '/admin/logs', '/admin/profile']
    };

    const labels = {
      dashboard: 'Dashboard',
      'new-ticket': 'New Ticket',
      'my-tickets': 'My Tickets',
      profile: 'Profile',
      tickets: 'Tickets',
      'tickets-approval': 'Approval',
      performance: 'Performance',
      database: 'Database',
      settings: 'Settings',
      logs: 'Logs'
    };

    return baseRoutes[role]?.map((path) => {
      const key = path.split('/').pop(); // get last segment
      return (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            `px-3 py-2 rounded shadow-sm transition duration-150 text-sm ${
              isActive ? 'bg-white text-teal-600 font-bold' : 'hover:bg-teal-600'
            }`
          }
          onClick={handleLinkClick}
        >
          {labels[key] || key}
        </NavLink>
      );
    });
  };

  return (
    <nav className="bg-teal-500 text-white px-4 py-3 shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">MyHelpDesk</Link>

        {/* Hamburger */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        {/* Links */}
        <div
          className={`w-full md:w-auto flex-col md:flex-row md:flex items-center gap-4 mt-4 md:mt-0 ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          {renderLinks()}

          {user && (
            <div className="flex flex-col items-center justify-center bg-red-100 text-center rounded-full px-2 py-1 shadow w-[72px] h-[42px]">
              <span className="text-[10px] font-bold text-red-700 uppercase">
                {user.role}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false); // also close menu after logout
                }}
                className="text-[9.5px] text-white bg-red-600 hover:bg-red-700 px-2 py-[1px] rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
