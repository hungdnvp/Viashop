import React from "react";
import { useSelector } from "react-redux";
import { Input, Button } from "antd";
import styles from "./AccountPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function AccountPage() {
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo);
  return (
    <div className={cx("wrapper")}>
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
              <Input type="password" />
            </div>
            <div className={cx("item-info")}>
              <h4>Mật khẩu mới</h4>
              <Input type="password" />
            </div>
            <div className={cx("item-info")}>
              <h4>Xác nhận lại mật khẩu</h4>
              <Input type="password" />
            </div>
            <div className={cx("item-info", "btn-changePass")}>
              <Button type="primary" size={"large"}>
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
