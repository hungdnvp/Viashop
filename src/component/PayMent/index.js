import classNames from "classnames/bind";
import styles from "./PayMent.module.scss";
import React from "react";
import { useState } from "react";
import { faCircleCheck, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Input } from "antd";
const cx = classNames.bind(styles);
function PayMent({ p_name, p_amount, p_unitPrice }) {
  const [name, setName] = useState(p_name || "");
  const [amount, setAmount] = useState(p_amount || 0);
  const [unitPrice, setUnitPrice] = useState(p_unitPrice || 0);
  const [totalPrice, setTotalPrice] = useState(0);
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
          <span>{name}</span>
          <span>X {amount}</span>
          <span>{unitPrice} đ</span>
        </div>
        <span
          style={{
            color: "rgb(100, 102, 105)",
            marginTop: "1rem",
            display: "block",
          }}
        >
          Tổng thanh toán
        </span>
        <h1 className={cx("total-cost")}>{totalPrice} đ</h1>
        <button className={cx("btn-payment", "btn")}>
          <FontAwesomeIcon className={cx("icon-ticket")} icon={faCircleCheck} />
          Thanh Toán
        </button>
      </div>
    </div>
  );
}
export default PayMent;
