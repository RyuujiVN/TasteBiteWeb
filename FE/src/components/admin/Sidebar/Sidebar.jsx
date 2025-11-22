import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MessageOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";

import { RiShieldUserLine, RiLockPasswordLine } from "react-icons/ri";

const items = [
  {
    type: "group",
    label: "TỔNG QUAN",
    children: [
      {
        key: "/dashboard",
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard">Thống kê</Link>,
      },
    ],
  },
  {
    type: "group",
    label: "QUẢN LÝ SẢN PHẨM",
    children: [
      {
        key: "/product",
        icon: <IoFastFoodOutline />,
        label: <Link to="/admin/product">Sản phẩm</Link>,
      },
      {
        key: "/categories",
        icon: <TagsOutlined />,
        label: <Link to="/admin/categories">Danh mục</Link>,
      },
    ],
  },
  {
    type: "group",
    label: "BÁN HÀNG",
    children: [
      {
        key: "/orders",
        icon: <ShoppingCartOutlined />,
        label: <Link to="/admin/orders">Đơn hàng</Link>,
      },
      {
        key: "/customers",
        icon: <UserOutlined />,
        label: <Link to="/admin/customers">Khách hàng</Link>,
      },
    ],
  },
  {
    type: "group",
    label: "NỘI DUNG & HỆ THỐNG",
    children: [
      {
        key: "/posts",
        icon: <FileTextOutlined />,
        label: <Link to="/admin/posts">Bài viết</Link>,
      },
      {
        key: "/events",
        icon: <CalendarOutlined />,
        label: <Link to="/admin/events">Sự kiện</Link>,
      },
    ],
  },
  {
    type: "group",
    label: "QUYỀN",
    children: [
      {
        key: "/roles",
        icon: <RiShieldUserLine size={18} />,
        label: <Link to="/admin/roles">Nhóm quyền</Link>,
      },
      {
        key: "/permissions",
        icon: <RiLockPasswordLine size={18} />,
        label: <Link to="/admin/permissions">Phân quyền</Link>,
      },
    ],
  },

  {
    type: "group",
    label: "HỖ TRỢ KHÁCH HÀNG",
    children: [
      {
        key: "/chat",
        icon: <MessageOutlined />,
        label: <Link to="/admin/chat">Chat khách hàng</Link>,
      },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <Sider theme="light" className="sidebar">
        <Menu
          items={items}
          className="sidebar__menu"
          defaultSelectedKeys={[location.pathname.split("/")[2]]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
