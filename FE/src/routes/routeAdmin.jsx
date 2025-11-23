import LayoutDefault from "~/components/admin/LayoutDefault/LayoutAdmin";
import Admin from "~/pages/admin/Admin/Admin";
import Category from "~/pages/admin/Category/Category";
import Dashboard from "~/pages/admin/Dashboard/Dashboard";
import Login from "~/pages/admin/Login/Login.jsx";
import AddProduct from "~/pages/admin/Product/AddProduct";
import Product from "~/pages/admin/Product/Product";
import UpdateProduct from "~/pages/admin/Product/UpdateProduct";
import Role from "~/pages/admin/Role/Role";

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
        path: "product/update/:id",
        element: <UpdateProduct />,
      },

      {
        path: "categories",
        element: <Category />,
      },

      {
        path: "roles",
        element: <Role />,
      },

      {
        path: "admins",
        element: <Admin />,
      },
    ],
  },
];

export default routes;
