import LayoutDefault from "~/components/admin/LayoutDefault/LayoutAdmin";
import Category from "~/pages/admin/Category/Category";
import Dashboard from "~/pages/admin/Dashboard/Dashboard";
import AddFood from "~/pages/admin/Food/AddFood";
import Food from "~/pages/admin/Food/Food";
import Login from "~/pages/admin/Login/Login.jsx";
import AddProduct from "~/pages/admin/Product/AddProduct";
import Product from "~/pages/admin/Product/Product";

const routes = [
  {
    path: "/admin/login",
    element: <Login />,
  },

  {
    path: "/admin",
    element: <LayoutDefault />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "product",
        element: <Product />,
      },

      {
        path: "product/add",
        element: <AddProduct />,
      },

      {
        path: "categories",
        element: <Category />,
      },

      {},
    ],
  },
];

export default routes;
