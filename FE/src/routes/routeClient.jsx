import LayoutDefault from "~/components/client/LayoutDefault/LayoutDefault";
import ProtectRoute from "~/components/ProtectRoute/ProtectRoute";
import Account from "~/pages/client/Account/Account";
import AccountAddress from "~/pages/client/AccountAddress/AccountAddress";
import AccountProfile from "~/pages/client/AccountProfile/AccountProfile";
import Home from "~/pages/client/Home/Home";
import Order from "~/pages/client/Order/Order";
import OrderSuccess from "~/pages/client/Order/OrderSuccess";
import ProductDetail from "~/pages/client/ProductDetail/ProductDetail";
import ProductFilter from "~/pages/client/ProductFilter/ProductFiler";

const routesClient = [
  {
    path: "",
    element: <LayoutDefault />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "product/:slug",
        element: <ProductDetail />,
      },

      {
        path: "/search",
        element: <ProductFilter />,
      },

      {
        element: <ProtectRoute />,
        children: [
          {
            path: "account",
            element: <Account />,
            children: [
              {
                path: "profile",
                element: <AccountProfile />,
              },

              {
                path: "address",
                element: <AccountAddress />,
              },
            ],
          },

          {
            path: "order",
            element: <Order />,
          },

          {
            path: "order-success",
            element: <OrderSuccess />,
          },
        ],
      },
    ],
  },
];

export default routesClient;
