import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.userStore);
  return !loading && isAuthenticated ? <Outlet /> : <Navigate to="/sign" />;
};

export default ProtectedRoute;
