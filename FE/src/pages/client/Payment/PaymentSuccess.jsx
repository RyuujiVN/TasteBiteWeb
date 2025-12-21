// PaymentSuccess.tsx
import { Result, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUpdatePaymentStatus } from "~/redux/order/orderSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dispatch] = useDispatch();

  useEffect(() => {
    const searchObject = Object.entries(searchParams);
    const fetchData = async () => {
      const payload = {
        id: searchObject?.orderCode,
        data: {
          payment_status: searchObject?.status,
        },
      };
      dispatch(fetchUpdatePaymentStatus(payload));
    };

    fetchData();
  }, []);

  return (
    <Result
      status="success"
      style={{ height: "80vh" }}
      title="Thanh toán thành công"
      subTitle={
        <>
          Đơn hàng đã được thanh toán thành công.
          <br />
          Bạn có thể theo dõi trạng thái đơn hàng trong mục "Đơn hàng của tôi".
        </>
      }
      extra={[
        <Button key="home" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>,

        <Button type="primary" key="order" onClick={() => navigate(`/orders`)}>
          Xem đơn hàng
        </Button>,
      ]}
    />
  );
};

export default PaymentSuccess;
