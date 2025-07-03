import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const OperationTeamLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default OperationTeamLayout;
