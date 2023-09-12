import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { handleRegisterApi } from "../../service/userService";
import { message } from "antd";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^[0-9]+$/;
const cx = classNames.bind(styles);
const Register = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [errMess, setErrMess] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [validName, setValidName] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setErrMess("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = PHONE_REGEX.test(phonenumber);
    if (!v1 || !v2 || !v3) {
      setErrMess("Giá trị nhập vào không hợp lệ");
      return;
    }
    if (password === repassword) {
      try {
        let inputData = {
          email: email,
          password: password,
          username: username,
          phonenumber: phonenumber,
        };
        let data = await handleRegisterApi(inputData);
        if (data && data.errCode === 0) {
          messageApi.info("Register successed");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
        if (data && data.errCode !== 0) {
          messageApi.info(data.errMessage);
        }
      } catch (err) {
        if (err.response) {
          if (err.response.data) {
            messageApi.info(err.response.data.errMessage);
          }
        }
      }
    } else {
      messageApi.info("Kiểm tra lại mật khẩu");
    }
  };
  const checkPhoneNumber = (inputPhoneNumber) => {
    if (PHONE_REGEX.test(inputPhoneNumber) || inputPhoneNumber === "") {
      setPhoneNumber(inputPhoneNumber);
    }
  };
  return (
    <div className={cx("container-login")}>
      {contextHolder}
      <div className={cx("form-box")}>
        <div className={cx("form-value")}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <p
              ref={errRef}
              className={errMess ? cx("errmess") : cx("offscreen")}
              aria-live="assertive"
            >
              {errMess}
            </p>
            <div className={cx("inputbox")}>
              <input
                ref={emailRef}
                type="email"
                name="email"
                required
                autoComplete="on"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
              <label>Email</label>
            </div>
            <div className={cx("inputbox")}>
              <input
                type="text"
                id="username"
                name="username"
                required
                autoComplete="on"
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
              <label htmlFor="username">Tên tài khoản</label>
              <p
                id="uidnote"
                className={
                  userFocus && username && !validName
                    ? cx("instructions")
                    : cx("offscreen")
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 đến 24 kí tự.
                <br />
                Phải bắt đầu bằng kí tự thường.
                <br />
                Cho phép sử dụng chữ cái, số, dấu gạch dưới, dấu gạch nối
              </p>
            </div>
            <div className={cx("inputbox")}>
              <input
                type="text"
                name="phonenumber"
                required
                autoComplete="off"
                onChange={(event) => checkPhoneNumber(event.target.value)}
                value={phonenumber}
              />
              <label>Số điện thoại</label>
            </div>
            <div className={cx("inputbox")}>
              <Input.Password
                id="password"
                name="password"
                required
                autoComplete="off"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <label htmlFor="password">
                Mật khẩu
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? cx("valid") : cx("hide")}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !password ? cx("hide") : cx("invalid")}
                />
              </label>
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? cx("instructions") : cx("offscreen")
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 đến 24 kí tự.
                <br />
                Bao gồm ít nhất một kí tự in hoa và thường, một số và một kí tự
                đặc biệt.
                <br />
                cho phép kí tự đặc biệt:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div className={cx("inputbox")}>
              <Input.Password
                name="repassword"
                required
                autoComplete="off"
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <label>Nhập lại mật khẩu</label>
            </div>
            <div className={cx("forget")}>
              <label htmlFor="remember">
                <input type="checkbox" id="remember" />
                Nhớ mật khẩu
              </label>
              <a href="/#">Quên mật khẩu</a>
            </div>
            <button type="submit">Đăng ký</button>
            <div className={cx("register")}>
              <p>
                Đã có tài khoản - <Link to={"/login"}>Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
