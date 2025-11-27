import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import accountService from "~/services/admin/accountService";

const Login = () => {
  const navigate = useNavigate();
  const { Text } = Typography;

  const handleLogin = async (data) => {
    const res = await accountService.login(data);

    localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    toast.success("Đăng nhập thành công");
    navigate("/admin/dashboard");
  };

  return (
    <>
      <h2 className="auth__form--title">Đăng nhập</h2>

      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
          <Input placeholder="Email..." />
        </Form.Item>

        <Form.Item
          label="Mật khẩu:"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password placeholder="Mật khẩu..." />
        </Form.Item>

        <div className="align-center">
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </div>

        <Form.Item className="auth__form--button">
          <Button type="primary" htmlType="submit" size="large">
            Đăng nhập
          </Button>
        </Form.Item>

        <div className="align-center">
          <Link to="/register">Chưa có tài khoản? Đăng ký</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
