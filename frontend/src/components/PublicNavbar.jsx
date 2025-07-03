import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css'; // ensure this import remains

const PublicNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/signin" onClick={() => setMenuOpen(false)}>Sign In</NavLink>
          <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
