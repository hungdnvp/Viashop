import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Button } from "antd";
import styles from "./AccountPage.module.scss";
import classNames from "classnames/bind";
import { handleChangePassword } from "../../service/userService";
import { message } from "antd";

const cx = classNames.bind(styles);
function AccountPage() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const userInfo = useSelector((state) => state.user);
  const confirmChangePass = async () => {
    if (!currentPass || !newPass || !confirmPass) {
      messageApi.error("Vui lòng nhập mật khẩu");
    } else {
      if (newPass !== confirmPass) {
        messageApi.error("Vui lòng xác nhận mật khẩu trùng với mật khẩu mới");
      } else {
        let data = await handleChangePassword(
          userInfo.id,
          currentPass,
          newPass
        );
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
