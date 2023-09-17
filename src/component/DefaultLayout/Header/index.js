import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
import DropdownUser from "./DropdownUser";
import useAuth from "../../../hooks/useAuth";
const cx = classNames.bind(styles);
function Header({ transparent = false }) {
  const { auth } = useAuth();
  const accessToken = auth?.accessToken;
  const classes = cx("wrapper", { transparent });

  return (
    <div className={classes}>
      <div className={cx("header-content")}>
        <div className={cx("left-content")}>
          <Link to="/">VIA-SHOP</Link>
        </div>
        <div className={cx("center-content")}></div>
        {accessToken ? (
          <div className={cx("current-user")}>
            <DropdownUser />
          </div>
        ) : (
          <div className={cx("right-content")}>
            <Button type="primary" size={"large"}>
              <Link to="/login">LOGIN</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
