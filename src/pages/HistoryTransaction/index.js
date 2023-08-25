import classNames from "classnames/bind";
import styles from "./HistoryTransaction.module.scss";
import FooterPage from "../../component/FooterPage";
import React, { useState } from "react";
import { Table } from "antd";

const cx = classNames.bind(styles);
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
function HistoryTransaction() {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "Ngày giao dịch",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "age",
      key: "age",

      ellipsis: true,
    },
    {
      title: "Số tiền",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Nội dung",
      dataIndex: "address",
      key: "address",

      ellipsis: true,
    },
  ];
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("section-header")}>
            <h3 className={cx("section-title")}>Lịch sử giao dịch</h3>
          </div>
          <div className={cx("block-content")}>
            <div className={cx("table-content")}>
              <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
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
