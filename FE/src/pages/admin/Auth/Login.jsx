import { Button, Form, Input, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "~/redux/user/userSlice";
import accountService from "~/services/accountService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Text } = Typography;

  const handleLogin = async (data) => {
    const res = await accountService.login(data);
    dispatch(login(res.data));

    if (data.role) navigate("/admin/dashboard");
    else navigate("/");


    toast.success("Đăng nhập thành công");
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
