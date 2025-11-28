import {
  UserOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { IoBagHandleOutline } from "react-icons/io5";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="account__sidebar">
      <div className="account__sidebar-user">
        <Avatar size={60} src={userInfo.avatar}></Avatar>
        <span className="account__sidebar-name">Nguyễn Long</span>
      </div>

      <ul className="account__sidebar-menu">
        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            `account__sidebar-item ${
              isActive ? "account__sidebar-item--active" : ""
            }`
          }
        >
          <UserOutlined />
          <span>Thông tin tài khoản</span>
        </NavLink>

        <NavLink
          to="/account/address"
          className={({ isActive }) =>
            `account__sidebar-item ${
              isActive ? "account__sidebar-item--active" : ""
            }`
          }
        >
          <EnvironmentOutlined />
          <span>Sổ địa chỉ</span>
        </NavLink>

        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            `account__sidebar-item ${
              isActive ? "account__sidebar-item--active" : ""
            }`
          }
        >
          <IoBagHandleOutline />
          <span>Quản lý đơn hàng</span>
        </NavLink>

        <NavLink
          to="/account/viewed"
          className={({ isActive }) =>
            `account__sidebar-item ${
              isActive ? "account__sidebar-item--active" : ""
            }`
          }
        >
          <EyeOutlined />
          <span>Sản phẩm đã xem</span>
        </NavLink>

        <div
          className="account__sidebar-item"
          onClick={() => {
            localStorage.removeItem("userInfo");
            location.href = "/login";
          }}
        >
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
