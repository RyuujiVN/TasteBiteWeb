import LayoutDefault from "~/components/client/LayoutDefault/LayoutDefault";
import Account from "~/pages/client/Account/Account";
import AccountProfile from "~/pages/client/AccountProfile/AccountProfile";
import Home from "~/pages/client/Home/Home";

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
        path: "account",
        element: <Account />,
        children: [
          {
            path: "profile",
            element: <AccountProfile />,
          },
        ],
      },
    ],
  },
];

export default routesClient;
