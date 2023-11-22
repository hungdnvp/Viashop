import classNames from "classnames/bind";
import styles from "./HistoryTransaction.module.scss";
import FooterPage from "../../../component/FooterPage";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Breadcrumb } from "antd";

const cx = classNames.bind(styles);
function HistoryTransaction() {
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
        `/api/viewTransaction?current=${pagination.current}&pageSize=${pagination.pageSize}`
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
      console.log("fetch list transaction err");
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
      title: "Mã giao dịch",
      dataIndex: "code",
      width: "10%",
      align: "center",
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "createdAt",
      render: (value) => value.slice(0, -5),
      width: "10%",
      align: "center",
    },
    {
      title: "Số tiền",
      dataIndex: "totalPayment",
      width: "10%",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "viaName",
      width: "20%",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
      align: "center",
    },
    {
      title: "Nội dung",
      dataIndex: "detail",
      // width: "30%",
    },
  ];
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("block-breadcrumb")}>
          <h4>GIAO DỊCH</h4>
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
                title: <Link to="#">Giao dịch</Link>,
              },
            ]}
          />
        </div>
        <div className={cx("container")}>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>Lịch sử mua hàng</h3>
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
export default HistoryTransaction;
