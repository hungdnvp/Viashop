import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  faClipboardCheck,
  faClockRotateLeft,
  faDollarSign,
  faMoneyCheckDollar,
  faPhone,
  faUserTie,
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
  const [menuGroupVia, setMenuGroupVia] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname.substring(1));
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  useEffect(() => {
    setPath(location.pathname.substring(1));

    const fetchAllGroupVia = async () => {
      try {
        let response = await axiosPrivate.get("/api/getAllGroupVia");
        if (response?.status === 200) {
          const groupVias = response.data;
          setMenuGroupVia(groupVias);
        }
      } catch (e) {
        console.log("slidebar fetch group via err");
        console.log(e);
      }
    };
    fetchAllGroupVia();
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
              icon={<FontAwesomeIcon icon={faUserTie} />}
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
                  path === "history-deposit"
                    ? styles[
                        ("custom-menu-item", "custom-menu-item-first", "active")
                      ]
                    : styles[("custom-menu-item", "custom-menu-item-first")]
                }
                component={<Link to="/history-deposit" />}
                icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
              >
                Lịch sử nạp tiền
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
                icon={<FontAwesomeIcon icon={faClockRotateLeft} />}
              >
                Lịch sử mua hàng
              </MenuItem>
              <MenuItem
                className={styles["custom-menu-item"]}
                component={<Link to="#" />}
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
              {menuGroupVia &&
                menuGroupVia.map((groupVia, index) => {
                  return (
                    <MenuItem
                      key={index}
                      component={<Link to={`/group-page/${groupVia.id}`} />}
                      className={styles["custom-menu-item"]}
                      icon={
                        <img
                          src={groupVia.image}
                          alt=""
                          className={cx("flag-national")}
                        />
                      }
                    >
                      {groupVia.groupViaName}
                    </MenuItem>
                  );
                })}
            </SubMenu>
            <SubMenu
              defaultOpen
              label={"THỦ THUẬT"}
              style={{ fontWeight: "600" }}
            >
              <MenuItem
                className={styles["custom-menu-item"]}
                component={<Link to="#" />}
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
