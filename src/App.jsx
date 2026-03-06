import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { PageWrapper } from './components/Layout/PageWrapper';
import { ProtectedRoute } from './components/Common/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Team } from './pages/Team';
import { Products } from './pages/Products';
import { Catalog } from './pages/Catalog';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Booking } from './pages/Booking';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

// Admin paneline yönlendirme bileşeni
function AdminRedirect() {
    useEffect(() => {
        window.location.href = '/admin/login';
    }, []);
    return null;
}

// The Home page is now accessible to everyone. 
// If we want a separate redirect just for the login/register pages we handle that inside their components.

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppointmentProvider>
                    <Routes>
                        <Route path="/" element={<PageWrapper />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="services" element={<Services />} />
                            <Route path="team" element={<Team />} />
                            <Route path="urunler" element={<Products />} />
                            <Route path="contact" element={<Catalog />} />
                            <Route path="katalog" element={<Catalog />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="booking" element={<Booking />} />
                                <Route path="dashboard" element={<Dashboard />} />
                            </Route>
                        </Route>

                        {/* Admin paneline yönlendirme */}
                        <Route path="/login.admin" element={<AdminRedirect />} />
                    </Routes>
                </AppointmentProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
