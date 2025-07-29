import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const ProtectedRoute = ({ children, allowedType }) => {
    const { user } = useUser();
    if (!user) return <Navigate to="/" />;
    if (allowedType && user.userType !== allowedType)
        return <Navigate to="/" />;
    return children;
};

export default ProtectedRoute;