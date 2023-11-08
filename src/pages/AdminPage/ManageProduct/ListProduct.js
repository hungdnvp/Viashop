import React, { useState, useEffect } from "react";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Tag, Modal, InputNumber, Input, Spin } from "antd";
import styles from "./ListProduct.module.scss";
import classNames from "classnames/bind";
import { message } from "antd";

const cx = classNames.bind(styles);
const { TextArea } = Input;

const ListProduct = () => {
  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [openModal, setOpenModal] = useState(false);
  const [spin, setSpin] = useState(false);
  // state edit item Via

  const columns = [
    {
      title: "Mã Product",
      dataIndex: "id",
      width: "20%",
      align: "center",
    },
    {
      title: "Thông tin Product",
      dataIndex: "information",
      width: "20%",
      align: "center",
    },
    {
      title: "Tên Via",
      dataIndex: "price",
      width: "10%",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "id",
      render: (value) => (
        <>
          <Button
            type="primary"
            danger
            icon={<FontAwesomeIcon icon={faPen} />}
            size={"medium"}
            // onClick={() => handleOnclickEdit(value)} //setOpenModal(true)
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
        setData(listVia.data);
      }
    } catch (e) {
      console.log("fetch list via err");
    }
    setLoading(false);
  };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  return (
    <Spin spinning={spin}>
      {
        <div className={cx("wrapper-display")}>
          {contextHolder}
          <Table
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
          {/* <Modal
            title="Chỉnh sửa thông tin Via"
            centered
            open={openModal}
            onOk={() => handleEditVia()}
            onCancel={() => setOpenModal(false)}
            width={1000}
          >
            <div className={cx("input-group-via")}>
              <div className={cx("input-group-item")}>
                <span>Tên Via:</span>
                <Input
                  size="large"
                  style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "0.25rem",
                    width: "60%",
                  }}
                  value={nameVia}
                  onChange={(e) => setNameVia(e.target.value)}
                />
              </div>
              <div className={cx("input-group-item")}>
                <span>Giá via:</span>

                <InputNumber
                  size="large"
                  min={1000}
                  step={1000}
                  formatter={(value) =>
                    `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                  style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "0.25rem",
                    width: "60%",
                  }}
                  value={price}
                  onChange={(value) => setPrice(value)}
                />
              </div>
              <div className={cx("input-group-item")}>
                <span>Giá sỉ:</span>
                <InputNumber
                  size="large"
                  min={1000}
                  step={1000}
                  formatter={(value) =>
                    `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                  style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "0.25rem",
                    width: "60%",
                  }}
                  value={discountPrice}
                  onChange={(value) => setDiscountPrice(value)}
                />
              </div>
              <div className={cx("input-group-item")}>
                <span>Số lượng mua đạt giá sỉ:</span>
                <InputNumber
                  size="large"
                  style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "0.25rem",
                    width: "60%",
                  }}
                  value={discountCondition}
                  onChange={(value) => setDiscountCondition(value)}
                />
              </div>
              <div className={cx("input-group-item")}>
                <span>Mô tả:</span>
                <TextArea
                  rows={4}
                  style={{ maxWidth: "60%" }}
                  value={descriptions}
                  onChange={(e) => setDescriptions(e.target.value)}
                />
              </div>
            </div>
          </Modal> */}
        </div>
      }
    </Spin>
  );
};
export default ListProduct;
