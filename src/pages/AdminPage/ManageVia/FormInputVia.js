import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Button, Input, InputNumber, Select } from "antd";
import classNames from "classnames/bind";
import styles from "./ManageVia.module.scss";
import { message } from "antd";

const cx = classNames.bind(styles);
const { TextArea } = Input;
const FormInputVia = ({ dataGroupViaProp }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const axiosPrivate = useAxiosPrivate();
  const [nameVia, setNameVia] = useState();
  const [price, setPrice] = useState(1000);
  const [discountPrice, setDiscountPrice] = useState();
  const [groupViaId, setGroupViaId] = useState();
  const [discountCondition, setDiscountCondition] = useState();
  const [descriptions, setDescriptions] = useState("");

  const handleAddVia = async () => {
    if (!nameVia || !price || !groupViaId || !descriptions) {
      messageApi.info("Vui lòng điền đầy đủ thông tin!");
    } else {
      const data = {
        nameVia: nameVia,
        groupViaId: groupViaId,
        price: price,
        discountPrice: discountPrice || null,
        discountCondition: discountCondition || null,
        descriptions: descriptions,
      };
      try {
        let response = await axiosPrivate.post("/adminApi/addVia", data);
        if (response?.status === 200) {
          messageApi.info("Thêm via thành công!");
        }
      } catch (e) {
        messageApi.error("Có lỗi xảy ra, vui lòng kiểm tra lại thông tin!");
        console.log("add via err");
      }
    }
    setNameVia("");
    setDescriptions("");
  };
  return (
    <div className={cx("wrapper-half-content")}>
      {contextHolder}
      <div className={cx("add-group-via", "add-group")}>
        <h4>Thêm Via</h4>
        <div className={cx("input-group-via")}>
          <div className={cx("input-group-item")}>
            <span>
              <span>Tên Via:</span>
              <span style={{ color: "red" }}>*</span>
            </span>
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
            <span>
              <span>Nhóm via:</span>
              <span style={{ color: "red" }}>*</span>
            </span>
            <Select
              defaultValue="chọn nhóm via"
              style={{
                backgroundColor: "#e9ecef",
                borderRadius: "0.25rem",
                width: "60%",
              }}
              value={groupViaId}
              onChange={(value) => setGroupViaId(value)}
              options={dataGroupViaProp}
            />
          </div>
          <div className={cx("input-group-item")}>
            <span>
              <span>Giá via:</span>
              <span style={{ color: "red" }}>*</span>
            </span>
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
            <span>
              <span>Mô tả:</span>
              <span style={{ color: "red" }}>*</span>
            </span>
            <TextArea
              rows={4}
              style={{ maxWidth: "60%" }}
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
            />
          </div>
          <div className={cx("btn-add-via")}>
            <Button type="primary" size="large" onClick={handleAddVia}>
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormInputVia;
