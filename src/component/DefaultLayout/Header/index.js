import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
import DropdownUser from "./DropdownUser";

const cx = classNames.bind(styles);
function Header({ transparent = false }) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const classes = cx("wrapper", { transparent });
  const linkStyle = {
    color: "white",
  };
  console.log("isloggedIn: ", isLoggedIn);

  return (
    <div className={classes}>
      <div className={cx("header-content")}>
        <div className={cx("left-content")}>
          <Link to="/">VIA-SHOP</Link>
        </div>
        <div className={cx("center-content")}></div>
        {isLoggedIn ? (
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
