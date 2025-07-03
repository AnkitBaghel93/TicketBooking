import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UserLayout from '../layouts/UserLayout';
import Dashboard from '../pages/User/Dashboard';


<Routes>
  {/* Public routes */}
  <Route path="/signin" element={<SignIn />} />

  {/* Protected routes by role */}
  <Route element={<PrivateRoute allowedRoles={['user']} />}>
    <Route path="/user" element={<UserLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      
    </Route>
  </Route>

  <Route element={<PrivateRoute allowedRoles={['admin']} />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
    </Route>
  </Route>

  
</Routes>
