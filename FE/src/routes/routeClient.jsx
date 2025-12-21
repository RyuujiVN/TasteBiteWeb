import LayoutDefault from "~/components/client/LayoutDefault/LayoutDefault";
import ProtectRoute from "~/components/ProtectRoute/ProtectRoute";
import Account from "~/pages/client/Account/Account";
import AccountAddress from "~/pages/client/AccountAddress/AccountAddress";
import AccountProfile from "~/pages/client/AccountProfile/AccountProfile";
import Home from "~/pages/client/Home/Home";
import Order from "~/pages/client/Order/Order";
import OrderSuccess from "~/pages/client/Order/OrderSuccess";
import PaymentFailed from "~/pages/client/Payment/PaymentFailed";
import PaymentSuccess from "~/pages/client/Payment/PaymentSuccess";
import ProductDetail from "~/pages/client/ProductDetail/ProductDetail";
import ProductFilter from "~/pages/client/ProductFilter/ProductFiler";
import Purchase from "~/pages/client/Purchase/Purchase";

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

              {
                path: "purchases",
                element: <Purchase />,
              },
            ],
          },

          {
            path: "order",
            element: <Order />,
          },

          {
            path: "order/success",
            element: <OrderSuccess />,
          },

          {
            path: "payment/success",
            element: <PaymentSuccess />,
          },

          {
            path: "payment/failed",
            element: <PaymentFailed />,
          },
        ],
      },
    ],
  },
];

export default routesClient;
