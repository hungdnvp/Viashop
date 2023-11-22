import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./ForGotPass.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  forGotPass,
  confirmforGotPass,
  autoLogin,
} from "../../service/userService";
import useAuth from "../../hooks/useAuth";
const cx = classNames.bind(styles);
const ForgotPassword = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [isRequested, setIsRequested] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const emailRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      const response = await autoLogin();
      if (response?.accessToken) {
        setAuth({
          email: response.email,
          accessToken: response.accessToken,
          authAdmin: response?.authAdmin || false,
        });
        navigate("/home", { replace: true });
        return null;
      }
    }
    checkLogin();
  }, []);
  useEffect(() => {
    if (!isRequested) emailRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Gửi yêu cầu đặt lại mật khẩu đến backend
    try {
      const response = await forGotPass(email);
      if (response && response.errCode === 0) {
        setIsRequested(true);
      }
    } catch (err) {
      let mess = err?.response?.data?.errMessage;
      messageApi.error(mess || "Có lỗi xảy ra, vui lòng thử lại sau!");
      setEmail("");
      emailRef.current.focus();
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitNewPass = async (e) => {
    e.preventDefault();
    try {
      const response = await confirmforGotPass({
        email: email,
        newPass: newPass,
        code: confirmCode,
      });
      if (response && response.errCode === 0) {
        messageApi.success("Mật khẩu đã được cập nhật thành công!");
        setTimeout(() => navigate("/login", { replace: true }), 1000);
      } else {
        messageApi.error(response?.errMessage || "Đã xảy ra lỗi");
      }
    } catch (e) {
      console.log(e);
      // messageApi.error(response?.errMessage || 'Đã xảy ra lỗi')
    }
  };
  return (
    <div
      className={cx("container")}
      style={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {contextHolder}

      <div className={cx("row justify-content-center")}>
        <div
          className={cx("col-md-4 mt-5")}
          style={{ maxWidth: "500px", paddingTop: "25px", width: "100%" }}
        >
          <div className={cx("card")}>
            <div className={cx("card-body")}>
              <h3 className={cx("card-title text-center mb-4")}>
                Khôi phục mật khẩu 🔒
              </h3>
              {isRequested ? (
                <>
                  <p>
                    Vui lòng điền đầy đủ thông tin để cập nhật mật khẩu của bạn.
                  </p>
                  <form onSubmit={handleSubmitNewPass}>
                    <div className={cx("form-group")}>
                      <label>Mật khẩu mới</label>
                      <input
                        type="password"
                        className={cx("form-control")}
                        placeholder="Nhập mật khẩu mới"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                      />
                    </div>
                    <div className={cx("form-group")}>
                      <label>Mã xác nhận</label>
                      <input
                        className={cx("form-control")}
                        value={confirmCode}
                        onChange={(e) => setConfirmCode(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className={cx("btn btn-primary")}
                      style={{
                        width: "100%",
                        backgroundColor: "#fb5bb9",
                        border: "none",
                        marginTop: "30px",
                      }}
                    >
                      {loading ? "Đang xử lý..." : "Xác nhận"}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <p>
                    Nhập email đã đăng ký, chúng tôi sẽ gửi mã khôi phục lại mật
                    khẩu qua email này.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className={cx("form-group")}>
                      <label>Email:</label>
                      <input
                        type="email"
                        ref={emailRef}
                        className={cx("form-control")}
                        placeholder="Nhập địa chỉ email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="submit"
                      className={cx("btn btn-primary")}
                      style={{
                        width: "100%",
                        backgroundColor: "#fb5bb9",
                        border: "none",
                        marginTop: "30px",
                      }}
                    >
                      {loading
                        ? "Đang xử lý..."
                        : "Gửi yêu cầu đặt lại mật khẩu"}
                    </button>
                  </form>
                  <p className="text-center mt-4">
                    <span>Bạn chưa có tài khoản?</span>
                    <Link to="/register">Tạo tài khoản</Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
