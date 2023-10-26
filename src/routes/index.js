import Home from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LayoutHeaderOnly from "../component/LayoutHeaderOnly";
import LayoutAdmin from "../component/LayoutAdmin";
import Forbident from "../pages/Fobiden";
import OrderPage from "../pages/OrderPage";
import AccountPage from "../pages/AccountPage";
import Banking from "../pages/Banking";
import HistoryTransaction from "../pages/HistoryTransaction";
import Unauthorized from "../pages/Unauthorized.js";
import HomeAdmin from "../pages/AdminPage/home";
import ManageUserPage from "../pages/AdminPage/ManageUserPage";
import ManageVia from "../pages/AdminPage/ManageVia/ManageVia";
import ListVia from "../pages/AdminPage/ManageVia/ListVia";
function ForbidenLayout({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
  );
}

const publicRoutes = [
  { path: "/", component: Home },
  { path: "home", component: Home },
  { path: "login", component: Login, layout: LayoutHeaderOnly },
  { path: "register", component: Register, layout: LayoutHeaderOnly },
  { path: "unauthorized", component: Unauthorized, layout: ForbidenLayout },
  { path: "*", component: Forbident, layout: ForbidenLayout },
];

const privateRoutes = [
  { path: "order", component: OrderPage },
  { path: "account", component: AccountPage },
  { path: "banking", component: Banking },
  { path: "history-transaction", component: HistoryTransaction },
  { path: "admin", component: HomeAdmin, layout: LayoutAdmin },
  { path: "admin/manage-user", component: ManageUserPage, layout: LayoutAdmin },
  { path: "admin/manage-viapublic", component: ManageVia, layout: LayoutAdmin },
  {
    path: "admin/manage-viapublic-show",
    component: ListVia,
    layout: LayoutAdmin,
  },
];

export { publicRoutes, privateRoutes };
