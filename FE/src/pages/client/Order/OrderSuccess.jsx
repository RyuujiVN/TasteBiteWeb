import React, { useEffect } from "react";
import { Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "./OrderSuccess.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "~/redux/cart/cartSlice";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    dispatch(fetchCart());
  }, []);

  return (
    <>
      <div className="order-success">
        <div className="order-success__container">
          <CheckCircleTwoTone
            className="order-success__icon"
            twoToneColor="#52c41a"
          />
          <h2 className="order-success__title">Đặt hàng thành công!</h2>
          <p className="order-success__message">
            Cảm ơn bạn đã đặt hàng! Chúng tôi đã nhận được đơn hàng của bạn và
            sẽ bắt đầu xử lý ngay. Bạn có thể theo dõi tình trạng đơn hàng trong
            tài khoản của mình.
          </p>
          <div className="order-success__actions">
            <Button onClick={() => navigate("/")}>Quay về trang chủ</Button>

            <Button type="primary" onClick={() => navigate("/orders")}>
              Xem đơn hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
