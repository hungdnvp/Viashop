import React from "react";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { handleRegisterApi } from "../../service/userService";

const cx = classNames.bind(styles);
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let inputData = {
        email: email,
        password: password,
        username: username,
        phonenumber: phonenumber,
      };
      let data = await handleRegisterApi(inputData);
      if (data && data.errCode !== 0) {
        alert(data.errMessage);
      }
      if (data && data.errCode === 0) {
        alert("Register successed");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          alert(err.response.data.errMessage);
        }
      }
    }
  };
  return (
    <div className={cx("container-login")}>
      <div className={cx("form-box")}>
        <div className={cx("form-value")}>
          <form onSubmit={handleSubmit}>
            <div className={cx("inputbox")}>
              <input
                type="email"
                name="email"
                required
                autoComplete="on"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
              <label htmlFor="">Email</label>
            </div>
            <div className={cx("inputbox")}>
              <input
                type="text"
                name="username"
                required
                autoComplete="on"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
              <label htmlFor="">Tên tài khoản</label>
            </div>
            <div className={cx("inputbox")}>
              <input
                type="text"
                name="phonenumber"
                required
                autoComplete="on"
                onChange={(event) => setPhoneNumber(event.target.value)}
                value={phonenumber}
              />
              <label htmlFor="">Số điện thoại</label>
            </div>
            <div className={cx("inputbox")}>
              {/* <input type="password" name="password" required autoComplete="on"
                                onChange={(event) => setPassword(event.target.value)} 
                                value={password}
                            /> */}
              {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <label htmlFor="">Mật khẩu</label>
            </div>
            <div className={cx("inputbox")}>
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <label htmlFor="">Nhập lại mật khẩu</label>
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