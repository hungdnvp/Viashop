import { React } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button } from "antd";
import styles from "./AccountPage.module.scss";
import classNames from "classnames/bind";
import { handleChangePassword } from "../../service/userService";
import { message } from "antd";

const cx = classNames.bind(styles);
function AccountPage() {
  const navigate = useNavigate();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  let user = useSelector((state) => state.userInfo);

  const confirmChangePass = async () => {
    if (!currentPass || !newPass || !confirmPass) {
      messageApi.error("Vui lòng nhập mật khẩu");
    } else {
      if (newPass !== confirmPass) {
        messageApi.error("Vui lòng xác nhận mật khẩu trùng với mật khẩu mới");
      } else {
        let data = await handleChangePassword(user.id, currentPass, newPass);
        if (data.errCode === -1) {
          navigate("/login");
        }
        if (data) {
          messageApi.info(data.errMessage);
        } else messageApi.error("Đổi mật khẩu thất bại");
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
              <span>{user && user.createdAt}</span>
            </div>
            <div className={cx("item-info", "name-accout")}>
              <h4>Tài khoản:</h4>
              <span>{user && user.username}</span>
            </div>
            <div className={cx("item-info", "email-accoutn")}>
              <h4>Email:</h4>
              <span>{user && user.email}</span>
            </div>
            <div className={cx("item-info", "balance")}>
              <h4>Số dư:</h4>
              <span className={cx("text-strong")}>
                {user && user.balance} VNĐ
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
