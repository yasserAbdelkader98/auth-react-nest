import { useAuth } from "../Context/auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const auth = useAuth();

  if (!auth?.isLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
