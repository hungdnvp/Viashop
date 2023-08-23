import Home from "../pages/HomePage";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
export function RequireAuth({ children }) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();

  return isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
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
