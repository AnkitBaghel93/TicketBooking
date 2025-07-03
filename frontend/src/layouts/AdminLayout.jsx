import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
