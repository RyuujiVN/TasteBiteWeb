import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePermission } from "~/hooks/usePermission";

const RbacRoute = ({ requiredPermission, redirectTo = "/access-denied" }) => {
  const hasPermission = usePermission(requiredPermission);

  if (!hasPermission) return <Navigate to={redirectTo} replace={true} />;

  return <Outlet />;
};

export default RbacRoute;
