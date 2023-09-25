import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleLoginApi, autoLogin } from "../../service/userService";
import useAuth from "../../hooks/useAuth";
import classNames from "classnames/bind";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const cx = classNames.bind(styles);
const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const { state } = useLocation();

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMess, setErrMess] = useState("");

  useEffect(() => {
    async function checkLogin() {
      const response = await autoLogin();
      if (response?.accessToken) {
        setAuth({
          email: response.email,
          accessToken: response.accessToken,
        });
        navigate(state?.path || "/home", { replace: true });
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMess("");
  }, [username, password]);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleRememberMeToggle = () => {
    setPersist((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLoginApi(username, password);
      const accessToken = response?.accessToken;
      if (response?.accessToken) {
        console.log("set accessToken: ", { accessToken });
        setAuth({
          email: response.email,
          accessToken: accessToken,
        });
        navigate(state?.path || "/home", { replace: true });
      } else {
        setErrMess(response?.errMessage || "Đăng nhập thất bại");
      }
    } catch (err) {
      if (err?.response) {
        if (err.response.status === 429) setErrMess(err.response.data);
        else setErrMess("Đăng nhập thất bại");
      } else {
        setErrMess("Đăng nhập thất bại");
      }
      userRef.current.focus();
    }
  };
  return (
    <div className={cx("container-login")}>
      <div className={cx("form-box")}>
        <div className={cx("form-value")}>
          <form onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMess ? cx("errmess") : cx("offscreen")}
              aria-live="assertive"
            >
              {errMess}
            </p>
            <h2>Đăng nhập</h2>
            <div className={cx("inputbox")}>
              {/* <ion-icon name="mail-outline" className={cx('icon-input'></ion-icon> */}
              <input
                ref={userRef}
                type="text"
                required
                autoComplete="off"
                onChange={(event) => setUserName(event.target.value)}
                value={username}
              />
              <label>Tên Đăng Nhập</label>
            </div>
            <div className={cx("inputbox")}>
              <Input.Password
                id="password"
                name="password"
                required
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {/* <input
                type="password"
                name="password"
                required
                autoComplete="on"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              /> */}
              <label>Mật khẩu</label>
            </div>
            <div className={cx("forget")}>
              <label htmlFor="remember">
                <input
                  type="checkbox"
                  id="remember"
                  onChange={handleRememberMeToggle}
                  checked={persist}
                />
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
