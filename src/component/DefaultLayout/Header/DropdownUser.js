import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/actions/authActions";
import { faClipboard, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCoins,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { logoutService } from "../../../service/userService";
import Link from "antd/es/typography/Link";

const cx = classNames.bind(styles);
function DropdownUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    logoutService();
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <div className={cx("wrapper-drop-down")}>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          <FontAwesomeIcon icon={faBars} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={cx("menu")} show={false}>
          <Dropdown.Item
            onClick={() => navigate("/account")}
            className={cx("item")}
          >
            <FontAwesomeIcon icon={faUser} />
            <span className={cx("menu-item")}>Tài Khoản</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate("/history-transaction")}
            className={cx("item")}
          >
            <FontAwesomeIcon icon={faClipboard} />
            <span className={cx("menu-item")}>Lịch sử giao dịch</span>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3" className={cx("item")}>
            <FontAwesomeIcon icon={faCoins} />
            <span className={cx("menu-item")}>Số dư:</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logOut} className={cx("item")}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span className={cx("menu-item")}>Đăng xuất</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
export default DropdownUser;
