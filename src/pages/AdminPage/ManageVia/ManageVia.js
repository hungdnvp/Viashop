import React, { useState } from "react";
import FormManageGroup from "./FormManageGroup";
import FormInputVia from "./FormInputVia";
import styles from "./ManageVia.module.scss";
import classNames from "classnames/bind";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const ManageVia = () => {
  const [dataGroupVia, setDataGroupVia] = useState();
  const transferData = (data) => {
    const newData = data.map((item) => {
      return { value: item.id, label: item.groupViaName };
    });
    setDataGroupVia(newData);
  };
  return (
    <div className={cx("wrapper-content")}>
      <div>
        <div className={cx("block-breadcrumb")}>
          <h4>QUẢN LÝ NHÓM - VIA</h4>
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
                title: <Link to="#">Quản lý nhóm - via</Link>,
              },
            ]}
          />
        </div>
      </div>
      <div className={cx("manage-block")}>
        <FormManageGroup setdataParent={transferData} />
        <FormInputVia dataGroupViaProp={dataGroupVia} />
      </div>
    </div>
  );
};
export default ManageVia;
