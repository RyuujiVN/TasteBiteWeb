import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import accountService from "~/services/accountService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);

      const email = searchParams.get("email") || "";
      const otp = searchParams.get("otp") || "";
      const data = {
        email: email,
        otp: otp,
        password: values.password,
        confirm_password: values.confirm_password,
      };

      const response = await accountService.resetPassword(data);

      toast.success(response.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="auth__form--title">Đặt mật khẩu</h2>

      <Form onFinish={handleResetPassword}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
          dependencies={["password"]}
          hasFeedback
        >
          <Input.Password
            placeholder="Vui lòng nhập lại mật khẩu mới"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPassword;
