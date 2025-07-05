import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';


// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import OperationTeamLayout from './layouts/OperationTeamLayout';
import TechnicalSupportLayout from './layouts/TechnicalSupportLayout';

// Auth
import Home from './pages/home/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import FacebookSuccess from './pages/Auth/FacebookSuccess';
import GoogleSuccess from './pages/Auth/GoogleSuccess';


// User Pages
import UserDashboard from './pages/User/Dashboard';
import NewTicket from './pages/User/NewTicket';
import MyTickets from './pages/User/MyTicket';
import Profile from './pages/User/ProfileSetting';
import TicketDetails from './pages/User/TicketDetails';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import Settings from './pages/Admin/Settings';
import UserLogs from './pages/Admin/UserLogHistory';
import AdminProfile from './pages/Admin/ProfileSetting';
import AdminDatabase from './pages/Admin/Database';

// Operation Team Pages
import OperationDashboard from './pages/OperationalTeam/Dashboard';
import OperationTickets from './pages/OperationalTeam/TicketList';
import OperationProfile from './pages/OperationalTeam/ProfileSetting';
import OperationTicketDetails from './pages/OperationalTeam/TicketDetails';
import OperationPerformance from './pages/OperationalTeam/Performance';
import OperationTicketsApproval from './pages/OperationalTeam/TicketApproval';

// Technical Support Pages
import TechDashboard from './pages/TechnicalSupport/Dashboard';
import TechTickets from './pages/TechnicalSupport/TicketList';
import TechPerformance from './pages/TechnicalSupport/Performance';
import TechProfile from './pages/TechnicalSupport/ProfileSetting';


// Route protection
import PrivateRoute from './routes/PrivateRoute';

// Optional
import NotFound from './pages/NotFound/NotFound';




const App = () => {
  return (
    <div>
    
    <Router >
     
      <Routes>

        <Route element={<PublicLayout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/facebook-success" element={<FacebookSuccess />} />
            <Route path="/google-success" element={<GoogleSuccess />} />


        </Route>



        {/* Role Protected Routes */}
        {/* User */}
        <Route element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="new-ticket" element={<NewTicket />} />
            <Route path="my-tickets" element={<MyTickets />} />
            <Route path="/user/tickets/:id" element={<TicketDetails />} />

            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>


        {/* Admin */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="database" element={<AdminDatabase />} />
            <Route path="logs" element={<UserLogs />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* Operation Team */}
        <Route element={<PrivateRoute allowedRoles={['operation']} />}>
          <Route path="/operation" element={<OperationTeamLayout />}>
            <Route path="dashboard" element={<OperationDashboard />} />
            <Route path="tickets" element={<OperationTickets />} />
            <Route path="tickets-approval" element={<OperationTicketsApproval />} />
              <Route path="tickets/:id" element={<OperationTicketDetails />} />
            <Route path="performance" element={<OperationPerformance />} />
            <Route path="profile" element={<OperationProfile />} />

          </Route>
        </Route>

        {/* Technical Support */}
        <Route element={<PrivateRoute allowedRoles={['technical']} />}>
          <Route path="/technical" element={<TechnicalSupportLayout />}>
            <Route path="dashboard" element={<TechDashboard />} />
            <Route path="tickets" element={<TechTickets />} />
            <Route path="performance" element={<TechPerformance />} />
            <Route path="profile" element={<TechProfile />} />
          </Route>
        </Route>
        
            
        <Route path="*" element={<NotFound />} />

       

      </Routes>
      
    </Router>
    </div>
  );
};

export default App;
