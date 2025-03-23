/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StoreContext } from "@/context/StoreContext";

// This component protects routes by checking for a valid auth token and role
export const ProtectedRoute = ({
  allowedRoles,
  redirectPath = "/auth/login",
}) => {
  const { authState } = useContext(StoreContext);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setTimeout(() => setIsChecking(false), 100);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>; // You could use a proper loader component here
  }

  // Check if user is authenticated and has the required role
  const isAuthenticated = authState.isAuthenticated;
  const hasRequiredRole = allowedRoles.includes(authState.role);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (isAuthenticated && !hasRequiredRole) {
    // User is logged in but doesn't have the right role
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

// AdminRoute - Only admins can access
export const AdminRoute = ({ redirectPath = "/auth/login" }) => {
  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectPath={redirectPath} />
  );
};

// UserRoute - Only regular users can access
export const UserRoute = ({ redirectPath = "/auth/login" }) => {
  return <ProtectedRoute allowedRoles={["user"]} redirectPath={redirectPath} />;
};

// UserOrAdminRoute - Both users and admins can access
export const UserOrAdminRoute = ({ redirectPath = "/auth/login" }) => {
  return (
    <ProtectedRoute
      allowedRoles={["user", "admin"]}
      redirectPath={redirectPath}
    />
  );
};
