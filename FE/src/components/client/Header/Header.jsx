import { Avatar, Dropdown, Flex, Form, Input } from "antd";
import LogoLetter from "~/assets/images/vy-food.png";
import Logo from "~/assets/images/vy-food-logo.png";
import { PiUserCircle } from "react-icons/pi";
import { IoLogInOutline } from "react-icons/io5";
import { PiUserCirclePlus } from "react-icons/pi";
import { BsCart3 } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { LuPackageCheck } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./Header.scss";
import accountService from "~/services/accountService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGetProfile } from "~/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <div className="header__body">
            <div
              className="header__logo header__logo--letter"
              onClick={() => navigate("/")}
            >
              <img src={LogoLetter} alt="Logo" height={60} />
            </div>

            <div
              className="header__logo header__logo--img"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" height={60} />
            </div>

            <Search />

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
