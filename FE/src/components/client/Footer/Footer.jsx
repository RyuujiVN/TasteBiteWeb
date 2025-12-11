import React, { useState } from "react";
import {
  FaReact,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaArrowRight,
  FaLinkedinIn,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa6";
import Logo from "~/assets/images/vy-food.png";
import "./Footer.scss";

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__top-content">
              <div className="footer__top-img">
                <img src={Logo} className="footer__logo" />
              </div>

              <div className="footer__top-subbox">
                <div className="footer__top-subs">
                  <h2 className="footer__top-subs-title">Đăng ký nhận tin</h2>
                  <p className="footer__top-subs-text">
                    Nhận thông tin mới nhất từ chúng tôi
                  </p>
                </div>

                <form className="footer__form">
                  <input
                    type="email"
                    className="footer__form-input"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="footer__form-btn">
                    <span>ĐĂNG KÝ</span>
                    <FaArrowRight />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* WIDGET AREA */}
        <div className="footer__widget-area">
          <div className="container">
            <div className="footer__widget-row">
              {/* ABOUT */}
              <div className="footer__widget-col footer__widget-col--large">
                <h3 className="footer__widget-title">Về chúng tôi</h3>
                <div className="footer__widget-content">
                  <p>
                    Vy Food là thương hiệu được thành lập vào năm 2022 với tiêu
                    chí đặt chất lượng sản phẩm lên hàng đầu.
                  </p>
                </div>

                <div className="footer__social">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="footer__social-item"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="footer__social-item"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="footer__social-item"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="footer__social-item"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>

              {/* LINKS */}
              <div className="footer__widget-col">
                <h3 className="footer__widget-title">Liên kết</h3>
                <ul className="footer__widget-list">
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Về chúng tôi</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Thực đơn</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Điều khoản</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Liên hệ</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Tin tức</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* MENU */}
              <div className="footer__widget-col">
                <h3 className="footer__widget-title">Thực đơn</h3>
                <ul className="footer__widget-list">
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Điểm tâm</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Món chay</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Món mặn</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Nước uống</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaArrowRight />
                      <span>Tráng miệng</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* CONTACT */}
              <div className="footer__widget-col footer__widget-col--large">
                <h3 className="footer__widget-title">Liên hệ</h3>

                <div className="footer__contact">
                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <FaLocationDot />
                    </div>
                    <div className="footer__contact-content">
                      273 An Dương Vương, Phường 3, Quận 5, TP Hồ Chí Minh
                    </div>
                  </div>

                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <FaPhone />
                    </div>
                    <div className="footer__contact-content">
                      <span>0123 456 789</span>
                      <br />
                      <span>0987 654 321</span>
                    </div>
                  </div>

                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <FaEnvelope />
                    </div>
                    <div className="footer__contact-content">
                      <span>abc@domain.com</span>
                      <br />
                      <span>infoabc@domain.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* COPYRIGHT */}
      <div className="copyright">
        <div className="container">
          <div className="copyright__content">
            <p>© 2022 Vy Food. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
