import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const RequireAuthAdmin = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.authAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} />
  );
};

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
