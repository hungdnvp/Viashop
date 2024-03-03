import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Col, Row, Breadcrumb } from "antd";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function HomeAdmin() {
  const month = new Date().getMonth() + 1;
  const [labelDashboard, setLabelDashboard] = useState({
    totalUser: null,
    totalDeposit: null,
    totalSoldProduct: null,
    totalDepositMonth: null,
  });

  useEffect(() => {
    //
  }, []);
  return (
    <div className={cx("wraper")}>
      <div className={cx("block-breadcrumb")}>
        <h4>THỐNG KÊ</h4>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/admin" style={{ color: "#0665d0" }}>
                  Admin
                </Link>
              ),
            },
            {
              title: <Link to="#">Dashboard</Link>,
            },
          ]}
        />
      </div>
      <Row>
        <Col span={6}>
          <div className={cx("outer")}>
            <div className={cx("small-box")}>
              <div className={cx("inner")}>
                <h3>2000</h3>
                <p>Tổng khách hàng</p>
                <div className={cx("icon")}></div>
                <Link to="">Xem thêm</Link>
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={cx("outer")}>
            <div className={cx("small-box", "bg-success")}>
              <div className={cx("inner")}>
                <h3>2000</h3>
                <p>Tài khoản đã bán</p>
                <div className={cx("icon")}></div>
                <Link to="">Xem thêm</Link>
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={cx("outer")}>
            <div className={cx("small-box", "bg-warning")}>
              <div className={cx("inner")}>
                <h3>2000</h3>
                <p>Tổng tiền nạp toàn thời gian</p>
                <div className={cx("icon")}></div>
                <Link to="">Xem thêm</Link>
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={cx("outer")}>
            <div className={cx("small-box", "bg-danger")}>
              <div className={cx("inner")}>
                <h3>2000</h3>
                <p>Tổng tiền nạp tháng {month}</p>
                <div className={cx("icon")}></div>
                <Link to="">Xem thêm</Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default HomeAdmin;
