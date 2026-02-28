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
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Booking } from './pages/Booking';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';

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
                            <Route path="blog" element={<Blog />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="booking" element={<Booking />} />
                                <Route path="dashboard" element={<Dashboard />} />
                            </Route>
                        </Route>
                    </Routes>
                </AppointmentProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
