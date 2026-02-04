import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AdminLayout from './layouts/AdminLayout'; // Import AdminLayout
import Home from './pages/user/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'; // Legacy Dashboard? Or renaming AdminOverview? 
// Let's assume AdminDashboard is the old one, we should use AdminOverview if relevant, but let's stick to what was imported before or check imports.
// Wait, AdminOverview exists in src/pages/admin/AdminOverview.jsx. 
// Step 632 AdminLayout used /admin/overview -> AdminOverview.
// Let's import the NEW admin pages.
import AdminOverview from './pages/admin/AdminOverview';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminStaff from './pages/admin/AdminStaff'; // New Import

import UserAppointments from './pages/user/UserAppointments';
import Media from './pages/user/Media';
import Profile from './pages/user/Profile';
import ExploreStaff from './pages/user/ExploreStaff';
import Products from './pages/user/Products';
import Settings from './pages/user/Settings';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Entry Point */}
          <Route path="/" element={<Landing />} />

          {/* Unified Login Route */}
          <Route path="/login/:role" element={<Login />} />

          {/* Customer Routes (Wrapped in MainLayout) */}
          <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/discovery" element={<Navigate to="/home" replace />} />
          <Route path="/appointments" element={<MainLayout><UserAppointments /></MainLayout>} />
          <Route path="/media" element={<MainLayout><Media /></MainLayout>} />
          <Route path="/explore-staff" element={<MainLayout><ExploreStaff /></MainLayout>} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />

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
