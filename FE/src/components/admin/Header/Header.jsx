/* eslint-disable no-unused-vars */
import { Flex } from "antd";
import Avatar from "antd/es/avatar";
import Dropdown from "antd/es/dropdown";
import Tooltip from "antd/es/tooltip";
import Typography from "antd/es/typography";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "~/components/admin/Header/Header.scss";
import logo from "~/assets/images/vy-food-logo.png";
import accountService from "~/services/accountService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGetProfile } from "~/redux/user/userSlice";

const items = [
  {
    key: "setting",
    label: "Cài đặt",
    icon: <SettingOutlined />,
  },

  {
    key: "logout",
    label: (
      <div
        onClick={() => {
          accountService.logout();
          location.href = "/login";
        }}
      >
        Đăng xuất
      </div>
    ),
    icon: <LogoutOutlined />,
  },
];

const Header = ({ collapse, setCollapse }) => {
  const { Text } = Typography;
  const profile = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchGetProfile());
    }
  }, [dispatch]);

  return (
    <>
      <header className="header">
        {/* Header Left */}
        <div className="header--left">
          <div className="header__logo">
            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* Header Right */}
        <div className="header--right">
          <div className="header__welcome">
            <h2 className="header__welcome--title">
              Chào mừng {userInfo?.user_name}
            </h2>
            <p className="header__welcome--sub">
              Hãy khám phá những gì bạn muốn
            </p>
          </div>
          <Flex gap={20} align="center">
            <Dropdown menu={{ items }} className="header__user">
              <Flex align="center" gap={10}>
                <Avatar size={40} src={userInfo?.avatar}></Avatar>
                <Flex vertical gap={5}>
                  <div className="header__user--name">
                    {userInfo?.user_name}
                  </div>
                  <div className="header__user--role">{userInfo?.role}</div>
                </Flex>
                <DownOutlined className="header__user--icon" />
              </Flex>
            </Dropdown>
          </Flex>
        </div>
      </header>
    </>
  );
};

export default Header;
