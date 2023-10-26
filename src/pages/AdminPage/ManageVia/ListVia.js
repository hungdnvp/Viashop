import React, { useState, useEffect } from "react";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Tag, Modal } from "antd";
import styles from "./ManageVia.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ListVia = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      key: 1,
      title: "Tên Via",
      dataIndex: "nameVia",
      width: "20%",
      align: "center",
      editable: true,
    },
    {
      key: 2,
      title: "Nhóm Via",
      dataIndex: ["GroupVium", "groupViaName"],
      width: "20%",
      align: "center",
    },
    {
      key: 3,
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      align: "center",
      editable: true,
    },
    {
      key: 4,
      title: "Giá sỉ",
      dataIndex: "discountPrice",
      width: "10%",
      align: "center",
      editable: true,
      render: (_, { discountPrice }) => (
        <Tag color={discountPrice ? "green" : "volcano"} key={discountPrice}>
          {discountPrice ? discountPrice : "undefined"}
        </Tag>
      ),
    },
    {
      key: 5,
      title: "số lượng mua đạt giá sỉ",
      dataIndex: "discountCondition",
      width: "5%",
      align: "center",
      editable: true,
    },
    {
      key: 6,
      title: "Mô tả",
      dataIndex: "descriptions",
      width: "20%",
      align: "center",
      editable: true,
    },
    {
      key: 7,
      title: "Action",
      align: "center",

      dataIndex: "",
      render: () => (
        <>
          <Button
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faPen} />}
            size={"medium"}
            onClick={() => setOpenModal(true)}
          >
            Sửa
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"medium"}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("list via fetch");
      let response = await axiosPrivate.get("/adminApi/getAllVia");
      if (response?.status === 200) {
        const listVia = response.data;
        console.log("listVia: ", listVia);
        setData(listVia);
      }
    } catch (e) {
      console.log("fetch list via err");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={cx("wrapper-display")}>
      <Table
        // bordered={true}

        scroll={{
          y: "max-content",
          x: "max-content",
        }}
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
        tableLayout={"auto"}
      />
      <Modal
        title="Modal 1000px width"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};
export default ListVia;
