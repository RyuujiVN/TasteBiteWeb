// PaymentFailed.tsx
import { Result, Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUpdatePaymentStatus } from "~/redux/order/orderSlice";
// import { retryPayment } from "~/redux/payment/paymentSlice";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchObject = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        id: searchObject?.orderCode,
        data: {
          payment_status: "FAILED",
        },
      };
      dispatch(fetchUpdatePaymentStatus(payload));
    };

    fetchData();
  }, []);

  const handleRetry = async () => {
    // try {
    //   const res = await dispatch(retryPayment({ orderCode })).unwrap();
    //   window.location.href = res.paymentUrl;
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <Result
      status="error"
      style={{ height: "80vh" }}
      title="Thanh toán thất bại"
      subTitle="Giao dịch không thành công hoặc đã bị huỷ. Vui lòng thử thanh toán lại để hoàn tất đơn hàng."
      extra={[
        <Button type="primary" key="retry" onClick={handleRetry}>
          Thanh toán lại
        </Button>,

        <Button key="order" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>,
      ]}
    />
  );
};

export default PaymentFailed;
