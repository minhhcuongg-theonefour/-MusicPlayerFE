import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, Redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../features/authSlice";

const requireAuth = () => {
  const token = useSelector(selectCurrentAccessToken);
  // console.log(token);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect( () => {
    if (!token) {
      window.location.replace('/login');
    }
  });

  return <Outlet />
}

export default requireAuth;
