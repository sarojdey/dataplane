import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated: authentication } = useAuth();
  const isAuthenticated = authentication;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectAuthenticatedUser;
