import { useNavigate } from "react-router-dom";
import {
  faBars,
  faClockRotateLeft,
  faCoins,
  faRightFromBracket,
  faScrewdriverWrench,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { logoutService } from "../../../service/userService";
import { message, Dropdown, Button } from "antd";

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
  const items = [
    {
      key: "1",
      label: (
        <Link to="/account">
          <FontAwesomeIcon icon={faUserTie} />
          <span className={cx("menu-item")}>Tài Khoản</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/history-transaction">
          <FontAwesomeIcon icon={faCoins} />
          <span className={cx("menu-item")}>Lịch sử nạp tiền</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/history-transaction">
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <span className={cx("menu-item")}>Lịch sử mua hàng</span>
        </Link>
      ),
    },

    {
      key: "5",
      label: (
        <Link to="/admin">
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          <span className={cx("menu-item")} style={{ color: "red" }}>
            Admin Pages
          </span>
        </Link>
      ),
      style: authAdmin ? { color: "red" } : { display: "none" },
    },
    {
      key: "4",
      label: (
        <div onClick={logOut}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className={cx("menu-item")}>Đăng xuất</span>
        </div>
      ),
    },
  ];

  return (
    <div className={cx("wrapper-drop-down")}>
      <Dropdown
        overlayClassName="dropdown-overlay"
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <Button>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Dropdown>
    </div>
  );
}
export default DropdownUser;
