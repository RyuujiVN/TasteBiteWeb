import HeroImg1 from "~/assets/images/hero-1.png";
import HeroImg2 from "~/assets/images/hero-2.png";
import HeroImg3 from "~/assets/images/hero-3.png";
import HeroImg4 from "~/assets/images/hero-4.png";
import HeroImg5 from "~/assets/images/hero-5.png";
import { CiDeliveryTruck } from "react-icons/ci";
import { SiAdguard } from "react-icons/si";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiMoney } from "react-icons/pi";
import { Carousel, Col, Row } from "antd";

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        <div className="hero__carousel">
          <Carousel arrows infinite autoplay>
            <div className="hero__carousel--img">
              <img fetchpriority="high" src={HeroImg1} alt="Ảnh" />
            </div>

            <div className="hero__carousel--img">
              <img fetchpriority="high" src={HeroImg2} alt="Ảnh" />
            </div>

            <div className="hero__carousel--img">
              <img fetchpriority="high" src={HeroImg3} alt="Ảnh" />
            </div>

            <div className="hero__carousel--img">
              <img fetchpriority="high" src={HeroImg4} alt="Ảnh" />
            </div>

            <div className="hero__carousel--img">
              <img fetchpriority="high" src={HeroImg5} alt="Ảnh" />
            </div>
          </Carousel>
        </div>

        <div className="hero__service">
          <Row gutter={[15, 20]}>
            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
              <div className="hero__service--item">
                <CiDeliveryTruck className="hero__service--icon" />

                <div className="hero__service--content">
                  <h3 className="">GIAO HÀNG NHANH</h3>
                  <p>Cho tất cả đơn hàng</p>
                </div>
              </div>
            </Col>

            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
              <div className="hero__service--item">
                <SiAdguard className="hero__service--icon" />

                <div className="hero__service--content">
                  <h3 className="">SẢN PHẨM AN TOÀN</h3>
                  <p>Cam kết chất lượng</p>
                </div>
              </div>
            </Col>

            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
              <div className="hero__service--item">
                <TfiHeadphoneAlt className="hero__service--icon" />

                <div className="hero__service--content">
                  <h3 className="">HỖ TRỢ 24/7</h3>
                  <p>Tất cả ngày trong tuần</p>
                </div>
              </div>
            </Col>

            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
              <div className="hero__service--item">
                <PiMoney className="hero__service--icon" />

                <div className="hero__service--content">
                  <h3 className="">HOÀN LẠI TIỀN</h3>
                  <p>Nếu không hài lòng</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
