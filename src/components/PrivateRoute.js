import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check token

    if (!token) {
        //Not logged in → Redirect to login
        return <Navigate to="/login" replace />;
    }

    // Logged in → Allow access
    return children;
};

export default PrivateRoute;
