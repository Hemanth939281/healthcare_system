import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../app/auth";

const ProtectedRoute = ({ children }: any) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;