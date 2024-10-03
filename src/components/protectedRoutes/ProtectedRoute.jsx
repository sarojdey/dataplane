import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated: authentication } = useAuth();
  const isAuthenticated = authentication;

  if (!isAuthenticated) {
    return <Navigate to="auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
