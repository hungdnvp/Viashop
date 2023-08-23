import Home from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LayoutHeaderOnly from "../component/LayoutHeaderOnly";
import Forbident from "../pages/Fobiden";
import OrderPage from "../pages/OrderPage";
import AccountPage from "../pages/AccountPage";
function ForbidenLayout({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
  );
}
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/login", component: Login, layout: LayoutHeaderOnly },
  { path: "/register", component: Register, layout: LayoutHeaderOnly },
  { path: "*", component: Forbident, layout: ForbidenLayout },
];

const privateRoutes = [
  { path: "/order", component: OrderPage },
  { path: "/account", component: AccountPage },
];

export { publicRoutes, privateRoutes };
