import { UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { IoBagHandleOutline } from "react-icons/io5";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const profile = useSelector((state) => state.user.currentUser);

  return (
    <div className="account__sidebar">
      <div className="account__sidebar-user">
        <Avatar size={60} src={profile?.avatar_url}></Avatar>
        <span className="account__sidebar-name">{profile?.full_name}</span>
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
