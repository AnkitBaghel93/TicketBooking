import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLinks = () => {
    switch (user?.role) {
      case 'user':
        return (
          <>
            <NavLink to="/user/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/user/new-ticket" onClick={() => setMenuOpen(false)}>New Ticket</NavLink>
            <NavLink to="/user/my-tickets" onClick={() => setMenuOpen(false)}>My Tickets</NavLink>
            <NavLink to="/user/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
          </>
        );
      case 'operation':
        return (
          <>
            <NavLink to="/operation/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/operation/tickets" onClick={() => setMenuOpen(false)}>Tickets</NavLink>
            <NavLink to="/operation/tickets-approval" onClick={() => setMenuOpen(false)}>TicketApproval</NavLink>
            <NavLink to="/operation/performance" onClick={() => setMenuOpen(false)}>Performance</NavLink>
            <NavLink to="/operation/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
          </>
        );
      case 'technical':
        return (
          <>
            <NavLink to="/technical/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/technical/tickets" onClick={() => setMenuOpen(false)}>Tickets</NavLink>
            <NavLink to="/technical/performance" onClick={() => setMenuOpen(false)}>Performance</NavLink>
            <NavLink to="/technical/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
          </>
        );
      case 'admin':
        return (
          <>
            <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/admin/database" onClick={() => setMenuOpen(false)}>Database</NavLink>
            <NavLink to="/admin/settings" onClick={() => setMenuOpen(false)}>Settings</NavLink>
            <NavLink to="/admin/logs" onClick={() => setMenuOpen(false)}>User Logs</NavLink>
            <NavLink to="/admin/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">MyHelpDesk</Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {renderLinks()}
          <button onClick={toggleTheme} className="theme-toggle">
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
