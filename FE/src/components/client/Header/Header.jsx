import { Avatar, Dropdown, Flex, Form, Input } from "antd";
import Logo from "~/assets/images/vy-food.png";
import { CiSearch } from "react-icons/ci";
import { PiUserCircle } from "react-icons/pi";
import { IoLogInOutline } from "react-icons/io5";
import { PiUserCirclePlus } from "react-icons/pi";
import { BsCart3 } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { LuPackageCheck } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./Header.scss";
import accountService from "~/services/accountService";
import { useSelector } from "react-redux";

const menuLogin = [
  {
    key: "login",
    label: <div onClick={() => (location.href = "/login")}>Đăng nhập</div>,
    icon: <IoLogInOutline size={20} color="#B5292F" />,
  },

  {
    key: "register",
    label: <div onClick={() => (location.href = "/register")}>Đăng ký</div>,
    icon: <PiUserCirclePlus size={20} color="#B5292F" />,
  },
];

const menuUser = [
  {
    key: "user",
    label: (
      <div onClick={() => (location.href = "/account/profile")}>
        Tài khoản của tôi
      </div>
    ),
    icon: <CiUser size={20} color="#B5292F" />,
  },

  {
    key: "order",
    label: (
      <div onClick={() => (location.href = "/account/orders")}>
        Đơn hàng của tôi
      </div>
    ),
    icon: <LuPackageCheck size={20} color="#B5292F" />,
  },

  {
    key: "logout",
    label: (
      <div
        onClick={() => {
          accountService.logout();
          location.href = "/";
        }}
      >
        Đăng Xuất
      </div>
    ),
    icon: <RiLogoutCircleRLine size={20} color="#B5292F" />,
  },
];

const Header = () => {
  const profile = useSelector((state) => state.user.currentUser);

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <div className="header__body">
            <div className="header__logo">
              <img src={Logo} alt="Logo" height={50} />
            </div>

            <div className="header__search">
              <Form className="header__search--form">
                <Form.Item name="search">
                  <Input
                    placeholder="Tìm kiếm món ăn..."
                    prefix={<CiSearch />}
                  />
                </Form.Item>
              </Form>
            </div>

            <div className="header__nav">
              <div className="header__auth">
                {profile ? (
                  <Dropdown menu={{ items: menuUser }}>
                    <div className="header__auth--dropdown">
                      <Avatar size={40} src={profile.avatar_url}></Avatar>
                      <Flex vertical gap={5}>
                        <div className="header__user--name">
                          {profile?.user_name}
                        </div>
                        <div className="header__user--role">
                          {profile?.role}
                        </div>
                      </Flex>
                    </div>
                  </Dropdown>
                ) : (
                  <Dropdown menu={{ items: menuLogin }}>
                    <div className="header__auth--dropdown">
                      <PiUserCircle className="header__icon" />
                      <span>Đăng nhập</span>
                    </div>
                  </Dropdown>
                )}
              </div>

              <div className="header__cart">
                <div className="header__cart--icon">
                  <BsCart3 className="header__icon" />

                  <div className="header__cart--quantity">0</div>
                </div>

                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
