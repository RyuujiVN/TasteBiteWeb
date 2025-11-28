import "./Account.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Account = () => {
  return (
    <div className="account">
      <div className="account__container container">
        <Sidebar />
        <div className="account__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
