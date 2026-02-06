import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/user/Home';
import Landing from './pages/Landing';
import Register from './pages/user/Register';
import Login from './pages/Login';
import AdminOverview from './pages/admin/AdminOverview';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminStaff from './pages/admin/AdminStaff';
import UserAppointments from './pages/user/UserAppointments';
import Media from './pages/user/Media';
import Profile from './pages/user/Profile';
import ExploreStaff from './pages/user/ExploreStaff';
import Products from './pages/user/Products';
import Settings from './pages/user/Settings';
import Booking from './pages/user/Booking';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Entry Point */}
          <Route path="/" element={<Landing />} />

          {/* Unified Login & Register Routes */}
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Routes (Wrapped in MainLayout) */}
          <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/discovery" element={<Navigate to="/home" replace />} />
          <Route path="/appointments" element={<MainLayout><UserAppointments /></MainLayout>} />
          <Route path="/media" element={<MainLayout><Media /></MainLayout>} />
          <Route path="/explore-staff" element={<MainLayout><ExploreStaff /></MainLayout>} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="/book-appointment" element={<MainLayout><Booking /></MainLayout>} />

          {/* Admin Routes (Wrapped in AdminLayout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="dashboard" element={<Navigate to="overview" replace />} />
          </Route>

          {/* Legacy/Fallback route aliases */}
          <Route path="/admin-dashboard" element={<Navigate to="/admin/overview" replace />} />
          <Route path="/dashboard" element={<Navigate to="/admin/overview" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
