import { Form, Input, Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailRegex } from "~/constants/regex";
import { useState } from "react";
import accountService from "~/services/accountService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (values) => {
    try {
      setLoading(true);
      const response = await accountService.forgotPassword(values);

      toast.success(response.message);

      navigate(`/send-otp/${values.email}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="auth__form--title">Quên mật khẩu</h2>

      <p className="auth__form--description">
        Vui lòng nhập email để lấy lại mật khẩu
      </p>

      <Form onFinish={handleForgotPassword}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },

            {
              pattern: emailRegex,
              message: "Vui lòng nhập email đúng định dạng!",
            },
          ]}
        >
          <Input placeholder="Email..." />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Gửi mã OTP
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
