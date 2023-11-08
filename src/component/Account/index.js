import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputNumber, Space } from "antd";
const cx = classNames.bind(styles);

function InfoAcc({ detail = false, changeAmount, data }) {
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  const handleChangeAmount = (value) => {
    changeAmount(value);
    setValue(value);
  };
  const classes =
    detail === false
      ? cx("block-container", "short", "col-xl-3", "col-md-6")
      : cx("block-container");
  let descriptions = data?.descriptions;
  if (descriptions) {
    descriptions = descriptions.split("\n");
  }
  const goToPayMent = (via) => {
    navigate("/order", { state: { via: via } });
  };
  return (
    <div className={classes}>
      <div className={cx("block-border")}>
        <div className={cx("block-header")}>
          <h3>{data?.nameVia || "undefined"}</h3>
        </div>
        <div className={cx("block-content")}>
          <div className={cx("block-content__mid")}>
            <p className={cx("sub-1")}>
              <strong className={cx("text-strong")}>&gt;&gt;</strong>
              <strong className={cx("text-strong")}>
                {data?.price + " đ" || "undefined"}
              </strong>
            </p>
            {data?.discountPrice && (
              <p className={cx("sub-2")}>
                Ưu đãi khi mua giá sỉ
                <br />
                Mua {data?.discountCondition || "undefined"} con
                <strong className={cx("text-strong")}>&gt;&gt;</strong>
                <strong className={cx("text-strong")}>
                  {data?.discountPrice + " đ" || "undefined"}
                </strong>
              </p>
            )}

            <p className={cx("sub-3")}>
              <span>Còn lại:</span>
              <strong className={cx("badge-pill")}>{data?.quantity}</strong>
            </p>
          </div>
          <div className={cx("block-content__detail")}>
            <ul className={cx("list__detail")}>
              {descriptions &&
                descriptions.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className={cx("icon-check")}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span>{item}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={cx("block-content__buy")}>
            {detail === false ? (
              <>
                {data?.quantity > 0 ? (
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faCartPlus} />}
                    size={"large"}
                    onClick={() => goToPayMent(data)}
                  >
                    MUA HÀNG
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    danger
                    icon={<FontAwesomeIcon icon={faCartPlus} />}
                    size={"large"}
                  >
                    HẾT HÀNG
                  </Button>
                )}
              </>
            ) : (
              <Space>
                <InputNumber
                  min={1}
                  max={data?.quantity}
                  value={value}
                  onChange={(number) => handleChangeAmount(number)}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    handleChangeAmount(1);
                  }}
                >
                  Reset
                </Button>
              </Space>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoAcc;
