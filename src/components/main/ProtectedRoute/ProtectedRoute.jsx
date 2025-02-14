import React from "react";
import { Navigate } from "react-router-dom";
import DashboardPage from "../../../pages/user/Dashboard";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = DashboardPage();

if (!isAuthenticated) {
    return <Navigate to="/forbidden" />;
}

  return children;
};

export default ProtectedRoute;
