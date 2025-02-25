import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired } from "../utils/auth"; // Import the auth utility

const ProtectedRoute = ({ children }) => {
  // Check authentication using the token
  const isAuth = isAuthenticated();
  const isExpired = isTokenExpired();
  if (!isAuth || !isExpired) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default ProtectedRoute;
