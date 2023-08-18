import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Button from "../../Button";
import DropdownUser from "./DropdownUser";

const cx = classNames.bind(styles);
function Header({ transparent = false }) {
  const currentUser = true;
  const classes = cx("wrapper", { transparent });
  return (
    <div className={classes}>
      <div className={cx("header-content")}>
        <div className={cx("left-content")}>
          <a href="/">VIA-SHOP</a>
        </div>
        <div className={cx("center-content")}></div>
        {currentUser ? (
          <div className={cx("current-user")}>
            <DropdownUser />
          </div>
        ) : (
          <div className={cx("right-content")}>
            <Button outline>Log in</Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
