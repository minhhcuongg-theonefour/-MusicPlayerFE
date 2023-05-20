import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../Components/Admin/Layout";
import { selectCurrentUserRole } from "./authSlice";

const role = () => {
  const userRole = useSelector(selectCurrentUserRole);
  const location = useLocation();

  return userRole === "ADMIN" ? (
    <Layout />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default role;
