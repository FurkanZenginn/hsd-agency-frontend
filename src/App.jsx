import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Appointments from './pages/Appointments';
import Media from './pages/Media';
import Profile from './pages/Profile';
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

          {/* Customer Routes */}
          <Route path="/home" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />

          <Route path="/discovery" element={<Navigate to="/home" replace />} />

          <Route path="/appointments" element={
            <MainLayout>
              <Appointments />
            </MainLayout>
          } />

          <Route path="/media" element={
            <MainLayout>
              <Media />
            </MainLayout>
          } />

          <Route path="/profile" element={
            <MainLayout>
              <Profile />
            </MainLayout>
          } />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          } />

          {/* Legacy route aliases */}
          <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />
          <Route path="/dashboard" element={<Navigate to="/admin-dashboard" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
