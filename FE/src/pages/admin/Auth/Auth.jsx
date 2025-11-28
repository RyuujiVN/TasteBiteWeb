import { Outlet } from "react-router-dom";
import "./Auth.scss";

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth__container">
        {/* Left side */}
        <div className="auth__introduce">
          <div className="auth__introduce--content">
            <h2 className="auth__introduce--title">
              Chào mừng đến với trang Vy Food
            </h2>
          </div>
        </div>

        {/* Right side */}
        <div className="auth__form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
