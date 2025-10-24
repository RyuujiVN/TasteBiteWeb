import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "~/pages/admin/Login/Login.scss";
import adminService from "~/services/admin/adminService";

const Login = () => {
  const { Text } = Typography;
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const res = await adminService.login(data);

    localStorage.setItem("admin", JSON.stringify(res.data));
    navigate("/admin/dashboard");
    toast.success("Đăng nhập thành công");
  };

  return (
    <>
      <div className="login">
        <div className="login__container">
          {/* Login Left */}
          <div className="login__introduce">
            <div className="login__introduce--content">
              <h2 className="login__introduce--title">
                Chào mừng đến với trang admin Food Delivery
              </h2>
            </div>
          </div>

          {/* Login Right */}
          <div className="login__form">
            <h2 className="login__form--title">Đăng nhập</h2>
            <Form gutter={24} layout="vertical" onFinish={handleLogin}>
              <Form.Item
                className="login__form--item"
                label="Email:"
                name="email"
                layout="vertical"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tài khoản",
                  },
                ]}
              >
                <Input
                  placeholder="Tài khoản đăng nhập..."
                  variant="outlined"
                  className="login__form--input"
                />
              </Form.Item>

              <Form.Item
                className="login__form--item"
                label="Mật khẩu:"
                name="password"
                layout="vertical"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Mật khẩu..."
                  variant="outlined"
                  className="login__form--input"
                />
              </Form.Item>

              <Link to="/admin/forgot-password">
                <Text>Quên mật khẩu?</Text>
              </Link>

              <Form.Item className="login__form--button">
                <Button type="primary" htmlType="submit" size="large">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
