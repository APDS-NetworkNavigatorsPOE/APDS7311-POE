import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
        // Redirect to login if no token is found
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        // Redirect to login if the user doesn't have the required role
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
