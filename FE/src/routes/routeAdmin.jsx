import LayoutDefault from "~/components/admin/LayoutDefault/LayoutAdmin";
import Permission from "~/pages/admin/Permission/Permission";
import Admin from "~/pages/admin/Admin/Admin";
import Category from "~/pages/admin/Category/Category";
import Dashboard from "~/pages/admin/Dashboard/Dashboard";
import Login from "~/pages/admin/Auth/Login.jsx";
import AddProduct from "~/pages/admin/Product/AddProduct";
import Product from "~/pages/admin/Product/Product";
import UpdateProduct from "~/pages/admin/Product/UpdateProduct";
import Role from "~/pages/admin/Role/Role";
import RbacRoute from "~/components/admin/Core/RbacRoute";
import { permissionEnum } from "~/config/rbacConfig";
import AccessDenied from "~/pages/AccessDenied/AccessDenied";
import NotFound from "~/pages/NotFound/NotFound";
import Auth from "~/pages/admin/Auth/Auth";
import Register from "~/pages/admin/Auth/Register";
import ForgotPassword from "~/pages/admin/Auth/ForgotPassword";

const routes = [
  {
    path: "",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
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
        path: "",
        element: <RbacRoute requiredPermission={permissionEnum.VIEW_PRODUCT} />,
        children: [
          {
            path: "product",
            element: <Product />,
          },
        ],
      },

      {
        path: "",
        element: <RbacRoute requiredPermission={permissionEnum.ADD_PRODUCT} />,
        children: [
          {
            path: "product/add",
            element: <AddProduct />,
          },
        ],
      },

      {
        path: "",
        element: (
          <RbacRoute requiredPermission={permissionEnum.UPDATE_PRODUCT} />
        ),
        children: [
          {
            path: "product/update/:id",
            element: <UpdateProduct />,
          },
        ],
      },

      {
        path: "",
        element: (
          <RbacRoute requiredPermission={permissionEnum.VIEW_CATEGORY} />
        ),
        children: [
          {
            path: "categories",
            element: <Category />,
          },
        ],
      },

      {
        path: "",
        element: <RbacRoute requiredPermission={permissionEnum.VIEW_ROLE} />,
        children: [
          {
            path: "roles",
            element: <Role />,
          },
        ],
      },

      {
        path: "",
        element: <RbacRoute requiredPermission={permissionEnum.VIEW_ADMIN} />,
        children: [
          {
            path: "admins",
            element: <Admin />,
          },
        ],
      },

      {
        path: "",
        element: (
          <RbacRoute
            requiredPermission={permissionEnum.UPDATE_PERMISSION_ROLE}
          />
        ),
        children: [
          {
            path: "permissions",
            element: <Permission />,
          },
        ],
      },
    ],
  },

  {
    path: "/access-denied",
    element: <AccessDenied />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
