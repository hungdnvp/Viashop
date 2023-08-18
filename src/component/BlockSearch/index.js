import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BlockSearch.module.scss";
import classNames from "classnames/bind";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function BlockSearch() {
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
          <Button className={cx("btn-search")} type="primary">
            Tìm Kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}
export default BlockSearch;
