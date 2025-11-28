import React from "react";
import { useRoutes } from "react-router-dom";
import routesAdmin from "~/routes/routeAdmin";
import routesClient from "~/routes/routeClient";

const AllRoute = () => {
  const children = useRoutes([...routesAdmin, ...routesClient]);

  return <>{children}</>;
};

export default AllRoute;
