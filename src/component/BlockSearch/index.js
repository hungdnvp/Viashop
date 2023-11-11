import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BlockSearch.module.scss";
import classNames from "classnames/bind";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const cx = classNames.bind(styles);

function BlockSearch() {
  const handleTest = () => {
    axios
      .get(
        "https://emailvalidation.abstractapi.com/v1/?api_key=395e56f28925475294ae17a7da7ce615&email=hotro.tk10000d@gmail.com"
      )
      .then((response) => {
        let check = response.data.is_smtp_valid.value;
        console.log(check);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("block-feature")}>
      <div className={cx("block-header")}>
        <h4 className={cx("block-title")}>Tìm kiếm theo tên sản phẩm</h4>
        <div className={cx("block-option")}>
          <button type="button" className={cx("btn-block-option")}>
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
        </div>
      </div>
      <div className={cx("block-content")}>
        <div className={cx("group")}>
          <input
            type="text"
            className={cx("input-search", "form-control")}
            placeholder="Nhập loại muốn tìm kiếm"
          />
          <Button
            className={cx("btn-search")}
            type="primary"
            onClick={handleTest}
          >
            Tìm Kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}
export default BlockSearch;
