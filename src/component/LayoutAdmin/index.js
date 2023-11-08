import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";

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
  getItem("Dashboard", "1", <DesktopOutlined />),
  getItem("Manage Users", "2", <UserOutlined />),
  getItem("Resoucre Manage", "sub1", <PieChartOutlined />, [
    getItem("List Via-Import", "3"),
    getItem("Group/Via", "4"),
    getItem("Products", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
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
      case "5":
        navigate("/admin/manage-product");
        break;
      default:
      // code block
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className={cx("wrapper-layout")}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
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
          TRÌNH QUẢN LÝ - ADMIN
        </Header>
        <Content
          style={{
            margin: "0 16px",
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
