import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";

const ViaPublic = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const dataTemp = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
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
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "key",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "PhoneNumber",
      dataIndex: "age",
      width: "15%",
    },
    {
      title: "Số dư",
      dataIndex: "address",
      width: "15%",
    },
    {
      title: "Action",
      dataIndex: "",
      render: () => (
        <>
          <Button
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"medium"}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    setData(dataTemp);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: dataTemp.length,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  return (
    <>
      <Row>
        <Col span={24}>col</Col>
      </Row>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={tableParams.pagination}
        //   onChange={handleTableChange}
      />
    </>
  );
};
export default ViaPublic;
