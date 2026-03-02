import { Navigate, Outlet } from 'react-router-dom';

export const AdminProtectedRoute = () => {
    const isAdminAuth = localStorage.getItem('hsd_admin_auth') === 'true';

    if (!isAdminAuth) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};
