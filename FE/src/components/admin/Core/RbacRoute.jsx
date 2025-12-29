import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { usePermission } from "~/hooks/usePermission";
import { fetchGetPermissions } from "~/redux/role/roleSlice";

const RbacRoute = ({ requiredPermission, redirectTo = "/access-denied" }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const hasPermission = usePermission(requiredPermission);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      await dispatch(fetchGetPermissions({ role: userInfo?.role }));
      setLoading(false);
    };

    fetchPermissions();
  }, []);

  if (!hasPermission && !loading)
    return <Navigate to={redirectTo} replace={true} />;

  if (loading) return null;

  return <Outlet />;
};

export default RbacRoute;
