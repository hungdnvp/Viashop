import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const RequireAuthAdmin = () => {
  const { auth } = useAuth();
  return auth?.authAdmin ? <Outlet /> : <Navigate to="/forbiden" replace />;
};

const RequireAuth = () => {
  const { auth } = useAuth();
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
