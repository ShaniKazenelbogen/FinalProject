import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';

const RequireAuth = ({ children, allowedTypes }) => {
    const { user } = useUser();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    const userTypeStr = typeof user.userType === 'string'
        ? user.userType
        : user.userType?.toString?.() || String(user.userType);

    if (allowedTypes && !allowedTypes.includes(userTypeStr)) {
        let redirectUrl = "/";
        if (userTypeStr === "Manager") {
            redirectUrl = "/dashboards/ManagerDashboard";
        } else if (userTypeStr === "Therapist") {
            redirectUrl = "/dashboards/TherapistDashboard";
        } else if (userTypeStr === "Client") {
            redirectUrl = "/dashboards/ClientDashboard";
        }
        return <Navigate to={redirectUrl} replace />;
    }

    return children;
};

export default RequireAuth;