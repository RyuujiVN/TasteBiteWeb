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
import "./HeaderClient.scss";
import accountService from "~/services/accountService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetProfile } from "~/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { fetchCart } from "~/redux/cart/cartSlice";
import Cart from "~/pages/client/Cart/Cart";

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

const HeaderClient = () => {
  const [openCart, setOpenCart] = useState(false);
  const profile = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleToggleCart = () => {
    setOpenCart(!openCart);
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchGetProfile());
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return (
    <>
      <header className="header-client">
        <div className="header-client__container container">
          <div className="header-client__body">
            <div
              className="header-client__logo header-client__logo--letter"
              onClick={() => navigate("/")}
            >
              <img src={LogoLetter} alt="Logo" />
            </div>

            <div
              className="header-client__logo header-client__logo--img"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" />
            </div>

            <Search />

            <div className="header-client__nav">
              <div className="header-client__auth">
                {profile ? (
                  <Dropdown menu={{ items: menuUser }}>
                    <div className="header-client__auth--dropdown">
                      <Avatar
                        size={40}
                        src={profile.avatar_url}
                        alt="Avatar"
                      ></Avatar>
                      <Flex vertical gap={5}>
                        <div className="header-client__auth--name">
                          {profile?.user_name}
                        </div>
                      </Flex>
                    </div>
                  </Dropdown>
                ) : (
                  <Dropdown menu={{ items: menuLogin }}>
                    <div className="header-client__auth--dropdown">
                      <PiUserCircle className="header-client__icon" />
                      <span>Đăng nhập</span>
                    </div>
                  </Dropdown>
                )}
              </div>

              <div className="header-client__cart" onClick={handleToggleCart}>
                <div className="header-client__cart--icon">
                  <BsCart3 className="header-client__icon" />

                  <div className="header-client__cart--quantity">
                    {cart?.cart_item?.length || 0}
                  </div>
                </div>

                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {openCart && <Cart open={openCart} onClose={handleToggleCart} />}
    </>
  );
};

export default HeaderClient;
