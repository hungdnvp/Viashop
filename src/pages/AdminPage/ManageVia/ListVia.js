import React, { useState, useEffect } from "react";
import {
  faTrashCan,
  faPen,
  faFileImport,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Button,
  Upload,
  Tag,
  Modal,
  InputNumber,
  Input,
  Spin,
  Space,
  Tooltip,
} from "antd";
import styles from "./ManageVia.module.scss";
import classNames from "classnames/bind";
import { message } from "antd";

const cx = classNames.bind(styles);
const { TextArea } = Input;

const ListVia = () => {
  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [openModal, setOpenModal] = useState(false);
  const [modalImport, setmodalImport] = useState(false);
  const [fileImport, setFileImport] = useState();
  const [spin, setSpin] = useState(false);
  // state edit item Via
  const [id, setId] = useState();
  const [nameVia, setNameVia] = useState();
  const [price, setPrice] = useState(1000);
  const [discountPrice, setDiscountPrice] = useState();
  const [discountCondition, setDiscountCondition] = useState();
  const [descriptions, setDescriptions] = useState("");

  const handleOnclickEdit = (itemData) => {
    try {
      setId(itemData.id);
      setNameVia(itemData.nameVia);
      setPrice(itemData.price);
      setDiscountPrice(itemData.discountPrice);
      setDiscountCondition(itemData.discountCondition);
      setDescriptions(itemData.descriptions);
      setOpenModal(true);
    } catch (e) {
      messageApi.error("lỗi xử lí chỉnh sửa dữ liệu");
    }
  };
  const readFileContents = async (file) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;
      if (fileContent.trim() === "") {
        messageApi.error("File trống !!!");
      } else {
        setSpin(true);
        const lines = fileContent.split("\n");
        let data = [];
        lines.map((item) => {
          if (item.trim() !== "")
            return data.push({
              information: item,
              viaId: id,
              status: "unsold",
            });
        });
        if (data && data.length > 0) {
          try {
            console.log("fetch bulcreate product", spin);
            let response = await axiosPrivate.post(
              "/apiAdmin/importProducts",
              data
            );
            if (response?.status === 200) {
              messageApi.success("nhập dữ liệu thành công !!!");
            } else {
              messageApi.error("lỗi nhập dữ liêu !!!");
            }
          } catch (e) {
            messageApi.error("lỗi nhập dữ liêu !!!");
          }
        }
        setSpin(false);
      }
    };
    reader.readAsText(file);
  };
  const props = {
    onChange: (info) => {
      if (info.file.status === "error") {
        setmodalImport(true);
        setFileImport(info.file.originFileObj);
      }
    },
    ondrop: () => {
      setSpin(false);
    },
  };
  const columns = [
    {
      title: "Tên Via",
      dataIndex: "nameVia",
      width: "22%",
      align: "center",
    },
    {
      title: "Nhóm Via",
      dataIndex: ["GroupVium", "groupViaName"],
      width: "15%",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      align: "center",
    },
    {
      title: "Giá sỉ",
      dataIndex: "discountPrice",
      width: "10%",
      align: "center",
      render: (_, { discountPrice }) => (
        <Tag color={discountPrice ? "green" : "volcano"}>
          {discountPrice ? discountPrice : "undefined"}
        </Tag>
      ),
    },
    {
      title: "số lượng mua đạt giá sỉ",
      dataIndex: "discountCondition",
      width: "5%",
      align: "center",
      render: (_, { discountCondition }) => (
        <Tag color={discountCondition ? "green" : "volcano"}>
          {discountCondition ? discountCondition : "undefined"}
        </Tag>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "descriptions",
      width: "20%",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "",
      render: (value) => (
        <Space>
          <Upload {...props} maxCount={1} accept=".txt" showUploadList={false}>
            <Tooltip title="nhập sản phẩm từ file" color={"#87d068"}>
              <Button
                style={{ backgroundColor: "#0665d0" }}
                type="primary"
                size="small"
                icon={<FontAwesomeIcon icon={faFileImport} />}
                onClick={() => setId(value.id)}
              >
                nhập
              </Button>
            </Tooltip>
          </Upload>
          <Button
            type="primary"
            danger
            style={{ margin: "0 6px" }}
            icon={<FontAwesomeIcon icon={faPen} />}
            size={"small"}
            onClick={() => handleOnclickEdit(value)} //setOpenModal(true)
          >
            sửa
          </Button>
          <Button
            danger
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            size={"small"}
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditVia = async () => {
    if (!id || !nameVia) {
      messageApi.info("Lỗi tham số đầu vào !!");
    } else {
      setSpin(true);
      setOpenModal(false);
      try {
        console.log("edit via fetch");
        let response = await axiosPrivate.post("/adminApi/editVia", {
          id: id,
          nameVia: nameVia,
          price: price,
          discountPrice: discountPrice,
          discountCondition: discountCondition,
          descriptions: descriptions,
        });
        if (response?.status === 200) {
          setOpenModal(false);
          await fetchData();
          messageApi.success("chỉnh sửa thành công!");
        }
      } catch (e) {
        console.log("fetch edit via err");
      }
    }
    setSpin(false);
  };
  const handleOkImport = async () => {
    console.log("import");
    setmodalImport(false);
    try {
      readFileContents(fileImport);
    } catch (e) {
      messageApi.error("có lỗi xảy ra !!!");
    }
  };
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
          <Modal
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
          </Modal>
          <Modal
            title="Xác nhận nhập dữ liệu"
            open={modalImport}
            onOk={handleOkImport}
            onCancel={() => {
              setmodalImport(false);
              setFileImport(null);
            }}
          >
            <p>Bạn có chắc muốn nhập dữ liệu từ file {fileImport?.name}</p>
          </Modal>
        </div>
      }
    </Spin>
  );
};
export default ListVia;
