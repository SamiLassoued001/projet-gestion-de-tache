import { Navigate } from "react-router-dom";

const RequireAdminAuth = ({ children }) => {
  const auth = localStorage.getItem("auth");

  if (!auth) return <Navigate to="/" />;

  const { user, isAuthenticated } = JSON.parse(auth);

  if (!isAuthenticated || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAdminAuth;
