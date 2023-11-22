import classNames from "classnames/bind";
import styles from "../HistoryTransaction/HistoryTransaction.module.scss";
import FooterPage from "../../../component/FooterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Breadcrumb } from "antd";

const cx = classNames.bind(styles);
function HistoryDeposit() {
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("list transaction fetch");
      let response = await axiosPrivate.get(
        `/api/viewDeposit?current=${pagination.current}&pageSize=${pagination.pageSize}`
      );
      if (response?.status === 200) {
        const data_response = response.data;
        console.log("listTransaction: ", data_response);
        setData(data_response.data);
        setPagination({
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data_response.total,
        });
      }
    } catch (e) {
      console.log("fetch list deposit err");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(pagination)]);

  const handleTableChange = (pagi, filters, sorter) => {
    setPagination({
      current: pagi.current,
      pageSize: pagi.pageSize,
      total: pagi.total,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };
  const columns = [
    {
      title: "Ngày thanh toán",
      dataIndex: "createdAt",
      render: (value) => value.slice(0, -5).replace("T", "---"),
      align: "center",
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      width: "10%",
      align: "center",
      render: (value) => <span style={{ color: "#db7e06" }}>{value}</span>,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "method",
      width: "15%",
      align: "center",
    },
    {
      title: "Thực hiện",
      dataIndex: "typePublish",
      width: "15%",
      align: "center",
      render: (value) => <span style={{ color: "red" }}>{value}</span>,
    },
    {
      title: "Trạng thái",
      width: "15%",
      align: "center",
      render: (value) => <span style={{ color: "green" }}>Thành công</span>,
    },
    {
      title: "Nội dung",
      width: "20%",
      align: "center",
      render: (value) => <i>Nạp tiền vào tài khoản</i>,
    },
  ];
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("block-breadcrumb")}>
          <h4>NẠP TIỀN</h4>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/home" style={{ color: "#0665d0" }}>
                    Home
                  </Link>
                ),
              },
              {
                title: <Link to="#">Nạp tiền</Link>,
              },
            ]}
          />
        </div>
        <div className={cx("container")}>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>Lịch sử nạp tiền</h3>
          </div>
          <div className={cx("block-content")}>
            <div className={cx("table-content")}>
              <Table
                bordered
                pagination={pagination}
                columns={columns}
                dataSource={data}
                loading={loading}
                tableLayout={"auto"}
                onChange={handleTableChange}
              />
            </div>
          </div>
        </div>
        <FooterPage fix />
      </div>
    </>
  );
}
export default HistoryDeposit;
