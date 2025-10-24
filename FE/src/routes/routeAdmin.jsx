import LayoutDefault from "~/components/admin/LayoutDefault/LayoutAdmin";
import Category from "~/pages/admin/Category/Category";
import Dashboard from "~/pages/admin/Dashboard/Dashboard";
import AddFood from "~/pages/admin/Food/AddFood";
import Food from "~/pages/admin/Food/Food";
import Login from "~/pages/admin/Login/Login.jsx";

const routes = [
  {
    path: "/admin/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/admin/food",
        element: <Food />,
      },

      {
        path: "/admin/food/add",
        element: <AddFood />,
      },

      {
        path: "/admin/category",
        element: <Category />,
      },
    ],
  },
];

export default routes;
