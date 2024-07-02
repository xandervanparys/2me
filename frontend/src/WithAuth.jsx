import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    console.log('Token in localStorage:', token); // Debug log
    return token ? true : false;
};

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (!isAuthenticated()) {
            return <Navigate to="/login" />;
        }
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
