import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Table, Input, Space } from "antd";
import classNames from "classnames/bind";
import styles from "./ManageVia.module.scss";
import { message } from "antd";

const cx = classNames.bind(styles);

const FormManageGroup = ({ setdataParent }) => {
  const [groupViaName, setGroupViaName] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "8%",
      align: "center",
      key: "id",
    },
    {
      title: "Nhóm Via",
      dataIndex: "groupViaName",
      align: "center",
      key: "groupViaName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      width: "30%",
      key: "action",

      render: () => (
        <Space>
          <Button
            // key={"edit"}
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faPen} />}
            size={"medium"}
            style={{ marginRight: "8px" }}
          >
            Sửa
          </Button>
          <Button
            // key={"delete"}
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"medium"}
          >
            xóa
          </Button>
        </Space>
      ),
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("group via fetch");
      let response = await axiosPrivate.get("/adminApi/getAllGroupVia");
      if (response?.status === 200) {
        const groupVias = response.data;
        console.log("groupVias: ", groupVias);
        setData(groupVias);
        setdataParent(groupVias);
        setLoading(false);
      }
    } catch (e) {
      console.log("fetch group via err");
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddGroupVia = async () => {
    try {
      let response = await axiosPrivate.get(
        `/adminApi/addGroupVia?groupViaName=${groupViaName}`
      );
      if (response?.status === 200) {
        console.log("add groupVia success");
        messageApi.success("Thêm nhóm Via thành công!");
        await fetchData();
      }
    } catch (e) {
      messageApi.error("Xảy ra lỗi, xin hãy thử lại!");
      console.log("add group via error");
    }
    setGroupViaName("");
  };
  return (
    <div className={cx("wrapper-half-content")}>
      {contextHolder}
      <div className={cx("add-group")}>
        <h4>Thêm nhóm via</h4>
        <div className={cx("input-group")}>
          <Input
            bordered
            size="large"
            placeholder="Tên nhóm Via"
            style={{
              backgroundColor: "#e9ecef",
              borderRadius: "0.25rem",
              width: "auto",
            }}
            value={groupViaName}
            onChange={(e) => setGroupViaName(e.target.value)}
          />
          <Button
            onClick={handleAddGroupVia}
            className={cx("btn-add")}
            type="primary"
            size="large"
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table
        bordered={true}
        scroll={{
          y: 500,
          x: 100,
        }}
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};
export default FormManageGroup;
