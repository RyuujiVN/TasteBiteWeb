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
import SendOtp from "~/pages/admin/Auth/SendOtp";
import ResetPassword from "~/pages/admin/Auth/ResetPassword";

const routesAdmin = [
  // Routes cho auth
  {
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "send-otp/:email", element: <SendOtp /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },

  // Routes admin
  {
    path: "/admin",
    element: <LayoutDefault />,
    children: [
      { path: "dashboard", element: <Dashboard /> },

      // Product routes
      {
        path: "product",
        element: <RbacRoute requiredPermission={permissionEnum.VIEW_PRODUCT} />,
        children: [{ path: "", element: <Product /> }],
      },
      {
        path: "product/add",
        element: <RbacRoute requiredPermission={permissionEnum.ADD_PRODUCT} />,
        children: [{ path: "", element: <AddProduct /> }],
      },
      {
        path: "product/update/:id",
        element: (
          <RbacRoute requiredPermission={permissionEnum.UPDATE_PRODUCT} />
        ),
        children: [{ path: "", element: <UpdateProduct /> }],
      },

      // Category routes
      {
        path: "categories",
        element: (
          <RbacRoute requiredPermission={permissionEnum.VIEW_CATEGORY} />
        ),
        children: [{ path: "", element: <Category /> }],
      },

      // Role routes
      {
        path: "roles",
        element: <RbacRoute requiredPermission={permissionEnum.VIEW_ROLE} />,
        children: [{ path: "", element: <Role /> }],
      },

      // Admin routes
      {
        path: "admins",
        element: <RbacRoute requiredPermission={permissionEnum.VIEW_ADMIN} />,
        children: [{ path: "", element: <Admin /> }],
      },

      // Permission routes
      {
        path: "permissions",
        element: (
          <RbacRoute
            requiredPermission={permissionEnum.UPDATE_PERMISSION_ROLE}
          />
        ),
        children: [{ path: "", element: <Permission /> }],
      },
    ],
  },

  // Access denied & 404
  { path: "/access-denied", element: <AccessDenied /> },
  { path: "*", element: <NotFound /> },
];

export default routesAdmin;
