import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectTo }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.userStore);
  const urlToRedirect = redirectTo ? `/sign?redirect=${redirectTo}` : "/sign";
  return !loading && isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={urlToRedirect} />
  );
};

export default ProtectedRoute;
