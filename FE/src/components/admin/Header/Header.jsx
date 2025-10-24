/* eslint-disable no-unused-vars */
import { Avatar, Dropdown, Flex, Tooltip, Typography } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NotificationIcon } from "~/components/CustomeIcon/CustomeIcon";
import "~/components/admin/Header/Header.scss";
import logo from "~/assets/images/logo.png";
import adminService from "~/services/admin/adminService";

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
        onClick={async () => {
          await adminService.logout();
          location.href = "/admin/login";
          console("Hi");
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

  return (
    <>
      <header className="header">
        {/* Header Left */}
        <div className="header--left">
          <div className="header__logo">
            <img src={logo} alt="logo" />
            <h2 className="header__logo--title">Foody</h2>
          </div>
        </div>

        {/* Header Right */}
        <div className="header--right">
          <div className="header__welcome">
            <h2 className="header__welcome--title">Chào mừng Nguyễn Long</h2>
            <p className="header__welcome--sub">
              Hãy khám phá những gì bạn muốn
            </p>
          </div>
          <Flex gap={20} align="center">
            <Tooltip title="Notification">
              <div className="header__notification">
                <NotificationIcon />
              </div>
            </Tooltip>

            <Dropdown menu={{ items }} className="header__user">
              <Flex align="center" gap={10}>
                <Avatar
                  size={40}
                  src="https://lh5.googleusercontent.com/proxy/o55mBVHW_uXiYhlyFBT7RS-2nbzUyrboSI-GULlVrp72yF2E57fiafhvyIiul9bTI_KBrsgZnO14z4g2eZx_oWNGWHE9yfRvIg"
                ></Avatar>
                <Flex vertical gap={5}>
                  <div className="header__user--name">Nguyễn Long</div>
                  <div className="header__user--role">Admin</div>
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
