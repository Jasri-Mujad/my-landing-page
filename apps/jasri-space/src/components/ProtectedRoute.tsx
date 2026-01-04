import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../services/api';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verify = async () => {
            const data = await checkAuth();
            setIsAuthenticated(data.authenticated);
        };
        verify();
    }, []);

    if (isAuthenticated === null) {
        return <div className="flex justify-center items-center h-screen"><span className="loader">Loading...</span></div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
