import Header from "./Header";
import Sidebars from "./Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { ProSidebarProvider } from "react-pro-sidebar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <ProSidebarProvider>
        <Sidebars />
      </ProSidebarProvider>
      <div className={cx("header-content")}>
        <Header />
        <div className={cx("content")}> {children} </div>
      </div>
    </div>
  );
}
export default DefaultLayout;
