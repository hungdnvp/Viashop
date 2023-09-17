import { React } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button } from "antd";
import styles from "./AccountPage.module.scss";
import classNames from "classnames/bind";
import { handleChangePassword } from "../../service/userService";
import { message } from "antd";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const cx = classNames.bind(styles);
function AccountPage() {
  const navigate = useNavigate();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState();

  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        console.log("accout effect");
        const response = await axiosPrivate.get(
          `/api/getAccountInfo?email=${auth.email}`
        );
        if (response && response.data && isMounted) {
          setUserInfo(response.data.data);
        }
      } catch (err) {
        console.log("throw werrror");
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const confirmChangePass = async () => {
    setCurrentPass("");
    setConfirmPass("");
    setNewPass("");
    if (!currentPass || !newPass || !confirmPass) {
      messageApi.error("Vui lòng nhập mật khẩu");
    } else {
      if (newPass !== confirmPass) {
        messageApi.error("Vui lòng xác nhận mật khẩu trùng với mật khẩu mới");
      } else {
        try {
          const response = await axiosPrivate.post("/api/changePassword", {
            email: auth.email,
            currentPass,
            newPass,
          });
          if (response && response.data) {
            messageApi.info(response.data.errMessage);
          }
        } catch (err) {
          messageApi.error("Đổi mật khẩu thất bại");
        }
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("container")}>
        <div className={cx("section-header")}>
          <h3 className={cx("section-title")}>Cài đặt</h3>
        </div>
        <div className={cx("section-content")}>
          <div className={cx("info-account")}>
            <h3>Thông tin tài khoản</h3>
          </div>
          <div className={cx("detail-account")}>
            <div className={cx("item-info", "date-register")}>
              <h4>Ngày đăng kí:</h4>
              <span>{userInfo && userInfo.createdAt}</span>
            </div>
            <div className={cx("item-info", "name-accout")}>
              <h4>Tài khoản:</h4>
              <span>{userInfo && userInfo.username}</span>
            </div>
            <div className={cx("item-info", "email-accoutn")}>
              <h4>Email:</h4>
              <span>{userInfo && userInfo.email}</span>
            </div>
            <div className={cx("item-info", "balance")}>
              <h4>Số dư:</h4>
              <span className={cx("text-strong")}>
                {userInfo && userInfo.balance} VNĐ
              </span>
            </div>
          </div>
        </div>
        <div className={cx("section-content")}>
          <div className={cx("info-account")}>
            <h3>Đổi mật khẩu</h3>
          </div>
          <div className={cx("detail-account")}>
            <div className={cx("item-info")}>
              <h4>Mật khẩu hiện tại</h4>
              <Input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
              />
            </div>
            <div className={cx("item-info")}>
              <h4>Mật khẩu mới</h4>
              <Input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className={cx("item-info")}>
              <h4>Xác nhận lại mật khẩu</h4>
              <Input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            <div className={cx("item-info", "btn-changePass")}>
              <Button type="primary" size={"large"} onClick={confirmChangePass}>
                Lưu lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountPage;
