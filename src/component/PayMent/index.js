import classNames from "classnames/bind";
import styles from "./PayMent.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { faCircleCheck, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Input } from "antd";
const cx = classNames.bind(styles);
function PayMent({ p_name, p_amount, p_unitPrice }) {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState("");
  const [balance, setBalance] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // console.log("effect payment");
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/getAccountInfo?email=${auth.email}`
        );
        if (response && response.data && isMounted) {
          setBalance(response.data.data.balance);
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

  const handleSubmitPayMent = (money) => {
    alert("you lose money:" + money);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("block-input")}>
        <input
          className={cx("input-code", "form-control")}
          type="text"
          placeholder="Mã giảm giá？"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button className={cx("btn-check-discount", "btn")}>
          <FontAwesomeIcon className={cx("icon-ticket")} icon={faTicket} />
          Áp dụng
        </button>
      </div>
      <div className={cx("block-payment")}>
        <h4 className={cx("title")}>Tổng cộng</h4>
        <div className={cx("account")}>
          <span>{p_name || ""}</span>
          <span>X {p_amount || ""}</span>
          <span>{p_unitPrice || ""} đ</span>
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
        <h1 className={cx("total-cost")}>{p_unitPrice * p_amount} đ</h1>
        <p
          style={
            p_unitPrice * p_amount > balance
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Số dư không đủ
        </p>
        <button
          className={cx("btn-payment", "btn")}
          disabled={p_unitPrice * p_amount > balance ? true : false}
          onClick={() => handleSubmitPayMent(p_unitPrice * p_amount)}
        >
          <FontAwesomeIcon className={cx("icon-ticket")} icon={faCircleCheck} />
          Thanh Toán
        </button>
      </div>
    </div>
  );
}
export default PayMent;
