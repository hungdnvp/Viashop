import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";
import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faClipboardCheck,
  faClockRotateLeft,
  faDollarSign,
  faMoneyCheckDollar,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

library.add(
  faClipboardCheck,
  faClockRotateLeft,
  faDollarSign,
  faMoneyCheckDollar,
  faPhone
);
const cx = classNames.bind(styles);
function Sidebars() {
  const [toggled, setToggled] = useState(false);
  const location = useLocation();
  const [path, setPath] = useState(location.pathname.substring(1));
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  useEffect(() => {
    setPath(location.pathname.substring(1));
  }, [location.pathname]);
  return (
    <div className={cx("wrapper")}>
      <Sidebar
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100%", position: "absolute" }}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      >
        <main>
          <div className={cx("logo-item")}></div>
          <Menu>
            <MenuItem
              className={
                path === "account"
                  ? styles[
                      ("custom-menu-item", "custom-menu-item-first", "active")
                    ]
                  : styles[("custom-menu-item", "custom-menu-item-first")]
              }
              component={<Link to="/account" />}
              icon={<FontAwesomeIcon icon={faUser} />}
            >
              Tài Khoản
            </MenuItem>
            <SubMenu
              defaultOpen
              label={"THANH TOÁN"}
              style={{ fontWeight: "600" }}
            >
              <MenuItem
                className={
                  path === "banking"
                    ? styles[
                        ("custom-menu-item", "custom-menu-item-first", "active")
                      ]
                    : styles[("custom-menu-item", "custom-menu-item-first")]
                }
                component={<Link to="/banking" />}
                icon={<FontAwesomeIcon icon={faDollarSign} />}
              >
                Nạp tiền
              </MenuItem>
              <MenuItem
                className={
                  path === "history-transaction"
                    ? styles[
                        ("custom-menu-item", "custom-menu-item-first", "active")
                      ]
                    : styles[("custom-menu-item", "custom-menu-item-first")]
                }
                component={<Link to="/history-transaction" />}
                icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
              >
                Lịch sử giao dịch
              </MenuItem>
              <MenuItem
                className={styles["custom-menu-item"]}
                component={<Link to="" />}
                icon={<FontAwesomeIcon icon={faClockRotateLeft} />}
              >
                Lịch sử mua hàng
              </MenuItem>
              <MenuItem
                className={styles["custom-menu-item"]}
                component={<Link to="" />}
                icon={<FontAwesomeIcon icon={faClipboardCheck} />}
              >
                Gửi ticket hỗ trợ
              </MenuItem>
            </SubMenu>
            <SubMenu
              defaultOpen
              label={"MUA HÀNG"}
              style={{ fontWeight: "600" }}
            >
              <MenuItem
                component={<Link to="" />}
                className={styles["custom-menu-item"]}
                icon={
                  <img
                    src={require("../../../asset/images/fbPage1.jpeg")}
                    alt=""
                    className={cx("flag-national")}
                  />
                }
              >
                Facebook Pages
              </MenuItem>
              <MenuItem
                component={<Link to="" />}
                className={styles["custom-menu-item"]}
                icon={
                  <img
                    src={require("../../../asset/images/fbBusiness.jpeg")}
                    alt=""
                    className={cx("flag-national")}
                  />
                }
              >
                BM Facebook
              </MenuItem>
              <MenuItem
                component={<Link to="" />}
                className={styles["custom-menu-item"]}
                icon={
                  <img
                    src={require("../../../asset/images/flag-vietnam.png")}
                    alt=""
                    className={cx("flag-national")}
                  />
                }
              >
                Via Việt Nam
              </MenuItem>
              <MenuItem
                component={<Link to="" />}
                className={styles["custom-menu-item"]}
                icon={
                  <img
                    src={require("../../../asset/images/flag-philippines.png")}
                    alt=""
                    className={cx("flag-national")}
                  />
                }
              >
                Via Host Philippines
              </MenuItem>
              <MenuItem
                component={<Link to="" />}
                className={styles["custom-menu-item"]}
                icon={
                  <img
                    src={require("../../../asset/images/flag-indonesia.png")}
                    alt=""
                    className={cx("flag-national")}
                  />
                }
              >
                Via Indonesia
              </MenuItem>
              <MenuItem
                component={<Link to="" />}
                className={styles["custom-menu-item"]}
                icon={
                  <img
                    src={require("../../../asset/images/flag-thailand.png")}
                    alt=""
                    className={cx("flag-national")}
                  />
                }
              >
                Via Thái Lan
              </MenuItem>
            </SubMenu>
            <SubMenu
              defaultOpen
              label={"THỦ THUẬT"}
              style={{ fontWeight: "600" }}
            >
              <MenuItem
                className={styles["custom-menu-item"]}
                component={<Link to="" />}
                icon={<FontAwesomeIcon icon={faFacebook} />}
              >
                Thủ thuật Facebook
              </MenuItem>
            </SubMenu>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
}
export default Sidebars;
