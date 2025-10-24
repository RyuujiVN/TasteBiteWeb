import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "~/routes/routeAdmin";

const AllRoute = () => {
  const children = useRoutes(routes);

  return <>{children}</>;
};

export default AllRoute;
