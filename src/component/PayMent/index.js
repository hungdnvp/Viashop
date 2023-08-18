import classNames from "classnames/bind";
import styles from "./PayMent.module.scss";
import React from "react";
import { faCircleCheck, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Input } from "antd";
const cx = classNames.bind(styles);
function PayMent() {
  const styleSpan = { color: "rgb(100, 102, 105)", "padding-top": "1rem" };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("block-input")}>
        <input
          className={cx("input-code", "form-control")}
          type="text"
          placeholder="Mã giảm giá？"
        />
        <button className={cx("btn-check-discount", "btn")}>
          <FontAwesomeIcon className={cx("icon-ticket")} icon={faTicket} />
          Áp dụng
        </button>
      </div>
      <div className={cx("block-payment")}>
        <h4 className={cx("title")}>Tổng cộng</h4>
        <div className={cx("account")}>
          <span>BM350 CỔ KHÁNG XMDT</span>
          <span>X10</span>
          <span>85.000 đ</span>
        </div>
        <span
          style={{
            color: "rgb(100, 102, 105)",
            "margin-top": "1rem",
            display: "block",
          }}
        >
          Tổng thanh toán
        </span>
        <h1 className={cx("total-cost")}>850.000 đ</h1>
        <button className={cx("btn-payment", "btn")}>
          <FontAwesomeIcon className={cx("icon-ticket")} icon={faCircleCheck} />
          Thanh Toán
        </button>
      </div>
    </div>
  );
}
export default PayMent;
