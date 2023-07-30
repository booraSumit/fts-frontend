import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { SIGNIN } from "../routing/routePaths";

export default function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.entity.auth);
  if (!isAuthenticated) return <Navigate to={SIGNIN} />;

  return <Outlet />;
}
