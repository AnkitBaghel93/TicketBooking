import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TechnicalSupportLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default TechnicalSupportLayout;
