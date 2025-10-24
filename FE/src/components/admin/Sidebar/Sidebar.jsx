import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { MdOutlineDashboardCustomize, MdOutlineFastfood } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    key: "dashboard",
    label: (
      <Link to="/admin/dashboard" className="sidebar__menu--item">
        <MdOutlineDashboardCustomize className="sidebar__menu--item-icon" />{" "}
        Thống kê
      </Link>
    ),
  },

  {
    key: "food",
    label: (
      <Link to="/admin/food" className="sidebar__menu--item">
        <MdOutlineFastfood className="sidebar__menu--item-icon" /> Món ăn
      </Link>
    ),
  },

  {
    key: "category",
    label: (
      <Link to="/admin/category" className="sidebar__menu--item">
        <BiFoodMenu className="sidebar__menu--item-icon" /> Loại món
      </Link>
    ),
  },

  {
    key: "orders",
    label: (
      <Link to="/admin/orders" className="sidebar__menu--item">
        <MdOutlineFastfood className="sidebar__menu--item-icon" /> Đơn hàng
      </Link>
    ),
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
