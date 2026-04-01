import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LandingPage from './pages/LandingPage';
import BrowsePlans from './pages/BrowsePlans';
import RenewPolicy from './pages/RenewPolicy'; // NEW
import SupportCenter from './pages/SupportCenter'; // NEW
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={<BrowsePlans />} />
          <Route path="/renew" element={<RenewPolicy />} />
          <Route path="/support" element={<SupportCenter />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute role="user" />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
export default App;
