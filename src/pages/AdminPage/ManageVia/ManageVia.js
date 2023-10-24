import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import FormManageGroup from "./FormManageGroup";
import FormInputVia from "./FormInputVia";
import styles from "./ManageVia.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ManageVia = () => {
  const axiosPrivate = useAxiosPrivate();
  const [dataGroupVia, setDataGroupVia] = useState();
  const transferData = (data) => {
    const newData = data.map((item) => {
      return { value: item.id, label: item.groupViaName };
    });
    setDataGroupVia(newData);
  };
  return (
    <div className={cx("wrapper-content")}>
      <FormManageGroup setdataParent={transferData} />
      <FormInputVia dataGroupViaProp={dataGroupVia} />
    </div>
  );
};
export default ManageVia;
