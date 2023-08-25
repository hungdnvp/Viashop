import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/actions/authActions";
import { handleLoginApi } from "../../service/userService";
import classNames from "classnames/bind";
import { message } from "antd";

const cx = classNames.bind(styles);
const Login = () => {
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await handleLoginApi(username, password);
      if (data && data.errCode !== 0) {
      }
      if (data && data.errCode === 0) {
        console.log(data);
        dispatch(loginSuccess(data.user));
        // navigate("/", { replace: true });
        navigate(state?.path || "/");
      } else {
        messageApi.error("Đăng nhập thất bại");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          messageApi.info(err.response.data.errMessage);
        }
      }
    }
  };
  return (
    <div className={cx("container-login")}>
      {contextHolder}
      <div className={cx("form-box")}>
        <div className={cx("form-value")}>
          <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div className={cx("inputbox")}>
              {/* <ion-icon name="mail-outline" className={cx('icon-input'></ion-icon> */}
              <input
                type="text"
                name="username"
                required
                autoComplete="on"
                onChange={(event) => setUserName(event.target.value)}
                value={username}
              />
              <label htmlFor="">Tên Đăng Nhập</label>
            </div>
            <div className={cx("inputbox")}>
              {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
              <input
                type="password"
                name="password"
                required
                autoComplete="on"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              <label htmlFor="">Mật khẩu</label>
            </div>
            <div className={cx("forget")}>
              <label htmlFor="remember">
                <input type="checkbox" id="remember" />
                Nhớ mật khẩu
              </label>
              <a href="/#">Quên mật khẩu</a>
            </div>
            <button type="submit">Đăng nhập</button>
            <div className={cx("register")}>
              <p>
                Chưa có tài khoản - <Link to="/register">Đăng ký</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
