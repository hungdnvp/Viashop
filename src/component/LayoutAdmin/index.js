import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
import logo2 from "../../asset/images/logonew.png";
import {
  faChartPie,
  faGaugeHigh,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <FontAwesomeIcon icon={faGaugeHigh} />),
  getItem("Khách Hàng", "2", <FontAwesomeIcon icon={faUser} />),
  getItem("Bán Tài Khoản", "sub1", <FontAwesomeIcon icon={faChartPie} />, [
    getItem("Danh Sách Via", "3"),
    getItem("Quản Lý Nhóm-Via", "4"),
    getItem("Tài Khoản", "5"),
  ]),
];

const LayoutAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const nextLayoutContent = (key) => {
    console.log(key);
    switch (key) {
      case "1":
        navigate("/admin");
        break;
      case "2":
        navigate("/admin/manage-user");
        break;
      case "3":
        navigate("/admin/manage-viapublic-show");
        break;
      case "4":
        navigate("/admin/manage-viapublic");
        break;
      // case "5":
      //   navigate("/admin/manage-product");
      //   break;
      default:
      // code block
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        // position: "fixed",
      }}
      className={cx("wrapper-layout")}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ position: "fixed", height: "100%" }}
      >
        <div className={cx("demo-logo-vertical")} />
        <Menu
          className={cx("menu-slide")}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(e) => nextLayoutContent(e.key)}
        />
      </Sider>
      <Layout className={cx("layout-content")}>
        <Header className={cx("header-layout-content")}>
          <img className={cx("lc-img-header")} src={logo2} alt="img-logo"></img>
        </Header>
        <Content
          style={{
            margin: "0 16px 0 216px",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Design ©2023 Created by QuangHung
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
