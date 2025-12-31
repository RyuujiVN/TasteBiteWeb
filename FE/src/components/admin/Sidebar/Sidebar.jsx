import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  TagsOutlined,
  MessageOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { RiShieldUserLine, RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { permissionEnum } from "~/config/rbacConfig";
import { useSelector } from "react-redux";

const rawItems = [
  {
    type: "group",
    label: "TỔNG QUAN",
    children: [
      {
        key: "/overview",
        icon: <HomeOutlined />,
        label: <Link to="/admin/overview">Trang tổng quan</Link>,
        permission: permissionEnum.VIEW_OVERVIEW,
        public: true,
      },

      {
        key: "/dashboard",
        icon: <DashboardOutlined />,
        label: <Link to="/admin/dashboard">Thống kê</Link>,
        permission: permissionEnum.VIEW_DASHBOARD,
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
        permission: permissionEnum.VIEW_PRODUCT,
      },
      {
        key: "/categories",
        icon: <TagsOutlined />,
        label: <Link to="/admin/categories">Danh mục</Link>,
        permission: permissionEnum.VIEW_CATEGORY,
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
        permission: permissionEnum.VIEW_ORDER,
      },
      {
        key: "/customers",
        icon: <UserOutlined />,
        label: <Link to="/admin/customers">Khách hàng</Link>,
        permission: permissionEnum.VIEW_USER,
      },
    ],
  },
  {
    type: "group",
    label: "QUYỀN",
    children: [
      {
        key: "/admins",
        icon: <RiShieldUserLine size={18} />,
        label: <Link to="/admin/admins">Tài khoản admin</Link>,
        permission: permissionEnum.VIEW_ADMIN,
      },
      {
        key: "/roles",
        icon: <RiShieldUserLine size={18} />,
        label: <Link to="/admin/roles">Nhóm quyền</Link>,
        permission: permissionEnum.VIEW_ROLE,
      },
      {
        key: "/permissions",
        icon: <RiLockPasswordLine size={18} />,
        label: <Link to="/admin/permissions">Phân quyền</Link>,
        permission: permissionEnum.UPDATE_PERMISSION_ROLE,
      },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const permissions = useSelector((state) => state.role.permissionsRole);

  const filterItems = (items) => {
    return items
      .map((group) => {
        const filteredChildren = group.children?.filter((child) => {
          if (child.public) return true;
          return permissions?.includes(child.permission);
        });

        if (!filteredChildren || filteredChildren.length === 0) return null;
        return { ...group, children: filteredChildren };
      })
      .filter(Boolean);
  };

  const items = filterItems(rawItems);

  return (
    <Sider theme="light" className="sidebar">
      <Menu
        items={items}
        className="sidebar__menu"
        defaultSelectedKeys={[location.pathname]}
      />
    </Sider>
  );
};

export default Sidebar;
