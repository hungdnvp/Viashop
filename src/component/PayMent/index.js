import classNames from "classnames/bind";
import styles from "./PayMent.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { faCircleCheck, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";

const cx = classNames.bind(styles);
function PayMent({ via, p_amount, resultPayment }) {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");
  const [balance, setBalance] = useState(0);
  const [spin, setSpin] = useState(false);

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

  const handleSubmitPayMent = async (viaId, p_amount) => {
    const quantity = parseInt(p_amount);
    if (viaId && quantity > 0) {
      setSpin(true);
      try {
        let response = await axiosPrivate.post("/api/payMent", {
          viaId: viaId,
          quantity: quantity,
        });
        console.log("not 200", response);

        if (response?.status === 200) {
          console.log(response.data);
          resultPayment({
            isOpenModal: true,
            statusModal: "success",
            title: "Thanh toán thành công",
            subTitle: response.data.errMessage,
          });
        } else {
          resultPayment({
            isOpenModal: true,
            statusModal: "error",
            title: "Thanh toán không thành công",
            subTitle: response?.data.errMessage || "Lỗi xử lí thanh toán !",
          });
        }
      } catch (e) {
        resultPayment({
          isOpenModal: true,
          statusModal: "error",
          title: "Thanh toán không thành công",
          subTitle: e?.response?.data.errMessage || "Lỗi xử lí thanh toán !",
        });
      }
      setSpin(false);
    } else {
      resultPayment({
        isOpenModal: true,
        statusModal: "error",
        title: "Thanh toán không thành công",
        subTitle: "Số lượng hoặc Via không phù hợp !",
      });
    }
  };
  const disiblePayMent =
    via?.price * p_amount > balance || p_amount < 1 ? true : false;
  return (
    <Spin spinning={spin}>
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
            <span>{via?.nameVia || ""}</span>
            <span>X {p_amount || "0"}</span>
            <span>{via?.price || ""} đ</span>
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
          <h1 className={cx("total-cost")}>{via?.price * p_amount || "0"} đ</h1>
          <p
            style={
              via?.price * p_amount > balance
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Số dư không đủ
          </p>
          <button
            className={cx("btn-payment", "btn")}
            disabled={disiblePayMent}
            onClick={() => handleSubmitPayMent(via?.id, p_amount)}
          >
            <FontAwesomeIcon
              className={cx("icon-ticket")}
              icon={faCircleCheck}
            />
            Thanh Toán
          </button>
        </div>
      </div>
    </Spin>
  );
}
export default PayMent;
