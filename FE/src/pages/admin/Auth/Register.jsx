import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "~/constants/regex";
import accountService from "~/services/accountService";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      delete data.confirm_password;

      await accountService.register(data);

      toast.success("Đăng ký thành công");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="auth__form--title">Đăng ký</h2>

      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item
          label="Họ và tên:"
          name="full_name"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên" },
            {
              pattern: /\D+/,
              message: "Họ tên không được chứa số",
            },
          ]}
        >
          <Input placeholder="Họ tên..." />
        </Form.Item>

        <Form.Item
          label="Email:"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            {
              pattern: emailRegex,
              message: "Vui lòng nhập đúng định dạng email",
            },
          ]}
        >
          <Input placeholder="Email..." />
        </Form.Item>

        <Form.Item
          label="Mật khẩu:"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            {
              pattern: passwordRegex,
              message:
                "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu..." />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu:"
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu..." />
        </Form.Item>

        <Form.Item className="auth__form--button">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Đăng ký
          </Button>

          <div style={{ marginTop: "1rem" }}>
            <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
