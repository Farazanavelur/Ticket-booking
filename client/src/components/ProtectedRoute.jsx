import React from 'react';
import { Navigate } from 'react-router-dom';

// Replace this with your actual authentication check logic
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Example: token stored in localStorage
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
