import classNames from "classnames/bind";
import styles from "./FooterPage.module.scss";
import React from "react";
const cx = classNames.bind(styles);
function FooterPage({ fix = false }) {
  const classes = fix ? cx("wrapper", "fix") : cx("wrapper");
  return (
    <div className={classes}>
      <div className={cx("left")}>
        © 2023 ViaShop. Tất cả quyền được bảo lưu.
      </div>
      <div className={cx("right")}>
        <span className={cx("national")}>Quốc gia & khu vực: </span>
        <span className={cx("national")}>Singapore</span>
        <span className={cx("national")}>Indonesia</span>
        <span className={cx("national")}>Việt Nam</span>
        <span className={cx("national")}>Đài Loan</span>
        <span className={cx("national")}>Thái Lan</span>
        <span className={cx("national")}>Philippines</span>
      </div>
    </div>
  );
}
export default FooterPage;
