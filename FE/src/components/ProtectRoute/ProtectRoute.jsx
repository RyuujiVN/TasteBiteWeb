import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

export default ProtectRoute;
