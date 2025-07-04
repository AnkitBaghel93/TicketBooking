import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css'; // keep this for any global styles

const PublicNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setMenuOpen(false);
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
          aria-label="Toggle navigation"
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        {/* Nav Links */}
        <div
          className={`w-full md:w-auto flex-col md:flex-row md:flex items-center gap-4 mt-4 md:mt-0 ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          {['/', '/signin', '/signup'].map((path) => {
            const labelMap = {
              '/': 'Home',
              '/signin': 'Sign In',
              '/signup': 'Sign Up',
            };
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded shadow-sm transition duration-150 text-sm ${
                    isActive
                      ? 'bg-white text-teal-600 font-bold'
                      : 'hover:bg-teal-600'
                  }`
                }
                onClick={handleLinkClick}
              >
                {labelMap[path]}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
