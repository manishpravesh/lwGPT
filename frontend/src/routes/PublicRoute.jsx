import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};
