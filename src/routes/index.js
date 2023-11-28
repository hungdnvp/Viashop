import Home from "../pages/ClientPage/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LayoutHeaderOnly from "../component/LayoutHeaderOnly";
import LayoutAdmin from "../component/LayoutAdmin";
import Forbident from "../pages/Fobiden";
import OrderPage from "../pages/ClientPage/OrderPage";
import AccountPage from "../pages/ClientPage/AccountPage";
import Banking from "../pages/ClientPage/Banking";
import HistoryTransaction from "../pages/ClientPage/HistoryTransaction";
import HistoryDeposit from "../pages/ClientPage/HistoryDeposit/index.js";
import Unauthorized from "../pages/Unauthorized.js";
import HomeAdmin from "../pages/AdminPage/home";
import ManageUserPage from "../pages/AdminPage/ManageUserPage";
import ManageVia from "../pages/AdminPage/ManageVia/ManageVia";
import ListVia from "../pages/AdminPage/ManageVia/ListVia";
import ListProduct from "../pages/AdminPage/ManageProduct/ListProduct";
import ForgotPassword from "../pages/ForGotPass/index.js";
import GroupViaPage from "../pages/ClientPage/GroupViaPage/index.js";
function ForbidenLayout({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
  );
}

const publicRoutes = [
  { path: "login", component: Login, layout: LayoutHeaderOnly },
  { path: "register", component: Register, layout: LayoutHeaderOnly },
  {
    path: "forgotpassword",
    component: ForgotPassword,
    layout: LayoutHeaderOnly,
  },
  { path: "unauthorized", component: Unauthorized, layout: ForbidenLayout },
  { path: "*", component: Forbident, layout: ForbidenLayout },
];

const privateRoutes = [
  { path: "/", component: Home },
  { path: "home", component: Home },
  { path: "order", component: OrderPage },
  { path: "account", component: AccountPage },
  { path: "banking", component: Banking },
  { path: "history-transaction", component: HistoryTransaction },
  { path: "history-deposit", component: HistoryDeposit },
  { path: "group-page/:groupId", component: GroupViaPage },

  /////////******ADMIN */
  { path: "admin", component: HomeAdmin, layout: LayoutAdmin },
  { path: "admin/manage-user", component: ManageUserPage, layout: LayoutAdmin },
  { path: "admin/manage-viapublic", component: ManageVia, layout: LayoutAdmin },
  {
    path: "admin/manage-viapublic-show",
    component: ListVia,
    layout: LayoutAdmin,
  },
  {
    path: "admin/manage-product",
    component: ListProduct,
    layout: LayoutAdmin,
  },
];

export { publicRoutes, privateRoutes };
