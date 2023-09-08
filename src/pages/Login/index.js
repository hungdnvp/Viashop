import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  toggleRememberMe,
} from "../../store/actions/authActions";
import { handleLoginApi } from "../../service/userService";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Login = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMess, setErrMess] = useState("");
  const [checkRemember, setcheckRemember] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMess("");
  }, [username, password]);
  const handleRememberMeToggle = () => {
    setcheckRemember(!checkRemember);
    dispatch(toggleRememberMe());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await handleLoginApi(username, password);
      if (data && data.errCode === 0) {
        dispatch(loginSuccess(data.user));
        navigate(state?.path || "/", { replace: true });
      } else {
        setErrMess("Đăng nhập thất bại");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMess("Đăng nhập thất bại");
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
                <input
                  type="checkbox"
                  id="remember"
                  onChange={handleRememberMeToggle}
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
