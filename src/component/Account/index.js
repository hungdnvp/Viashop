import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, InputNumber, Space } from "antd";
const cx = classNames.bind(styles);

function InfoAcc({ detail = false }) {
  const [value, setValue] = useState("1");
  const classes =
    detail === false
      ? cx("block-container", "short", "col-xl-3", "col-md-6")
      : cx("block-container");
  return (
    <div className={classes}>
      <div className={cx("block-border")}>
        <div className={cx("block-header")}>
          <h3>BM350 CỔ KHÁNG XMDT</h3>
        </div>
        <div className={cx("block-content")}>
          <div className={cx("block-content__mid")}>
            <p className={cx("sub-1")}>
              <strong className={cx("text-strong")}>&gt;&gt;</strong>
              <strong className={cx("text-strong")}>85.000đ</strong>
            </p>
            <p className={cx("sub-2")}>
              Ưu đãi khi mua giá sỉ
              <br />
              Mua 10 con
              <strong className={cx("text-strong")}>&gt;&gt;</strong>
              <strong className={cx("text-strong")}>70.000đ</strong>
            </p>
            <p className={cx("sub-3")}>
              <span>Còn lại:</span>
              <strong className={cx("badge-pill")}>100</strong>
            </p>
          </div>
          <div className={cx("block-content__detail")}>
            <ul className={cx("list__detail")}>
              <li>
                <span className={cx("icon-check")}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>Limit 50$ - Pay Lên BM3</span>
              </li>
              <li>
                <span className={cx("icon-check")}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>Đã Kháng XMDT</span>
              </li>
            </ul>
          </div>
          <div className={cx("block-content__buy")}>
            {detail === false ? (
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faCartPlus} />}
                size={"large"}
              >
                MUA HÀNG
              </Button>
            ) : (
              // <Button
              //   children={
              //     <span>
              //       <i style={{ "padding-right": "8px" }}>
              //         <FontAwesomeIcon icon={faCartPlus} />
              //       </i>
              //       MUA HÀNG
              //     </span>
              //   }
              //   primary={true}
              // />
              <Space>
                <InputNumber
                  min={1}
                  max={10}
                  value={value}
                  onChange={setValue}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    setValue(1);
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
