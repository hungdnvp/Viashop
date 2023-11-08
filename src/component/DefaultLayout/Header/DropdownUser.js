import { useNavigate } from "react-router-dom";
import { faClipboard, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCoins,
  faRightFromBracket,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import useAuth from "../../../hooks/useAuth";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { logoutService } from "../../../service/userService";
import { message } from "antd";

const cx = classNames.bind(styles);
function DropdownUser({ authAdmin }) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const logOut = async () => {
    try {
      let response = await logoutService();
      if (response?.errCode === 0) {
        setAuth({
          accessToken: null,
          email: null,
          authAdmin: false,
        });
        navigate("/login", { replace: true });
      } else {
        message.error("Đăng xuất không thành công!");
      }
    } catch (err) {
      message.error("Đăng xuất không thành công!");
    }
  };
  console.log("auth admin: ", authAdmin);
  return (
    <div className={cx("wrapper-drop-down")}>
      <Dropdown>
        <Dropdown.Toggle variant="primary">
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
            <span className={cx("menu-item")}>Lịch sử mua hàng</span>
          </Dropdown.Item>
          {authAdmin && (
            <Dropdown.Item
              onClick={() => navigate("/admin")}
              className={cx("item")}
            >
              <FontAwesomeIcon icon={faScrewdriverWrench} />
              <span className={cx("menu-item")} style={{ color: "red" }}>
                Admin Pages
              </span>
            </Dropdown.Item>
          )}
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
