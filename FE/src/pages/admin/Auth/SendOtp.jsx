import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import accountService from "~/services/admin/accountService";

const SendOtp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (values) => {
    setLoading(true);
    const response = await accountService.verifyOtp(values);

    toast.success(response.message);
    navigate(`/reset-password?email=${email}&otp=${values.otp}`);
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    await toast.promise(accountService.forgotPassword({ email: email }), {
      pending: "Đang gửi lại mã OTP...",
      success: "Gửi mã OTP thành công!",
    });
    setLoading(false);
  };

  return (
    <>
      <h2 className="auth__form--title">Nhập otp</h2>

      <p className="auth__form--description">
        Chúng tôi đã gửi mã otp cho email: {email}
      </p>

      <Form onFinish={handleSendOtp} initialValues={{ email: email }}>
        <Form.Item name="email" style={{ display: "none" }}>
          <Input placeholder="Email..." value={email} />
        </Form.Item>

        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã otp!",
            },
          ]}
          className="input-otp"
        >
          <Input.OTP placeholder="Mã otp..." className="input" size="large" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Xác minh
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="link"
            onClick={handleResendOtp}
            className="resend-otp"
            loading={loading}
          >
            Gửi lại mã OTP
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SendOtp;
