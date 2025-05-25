import { Navigate } from "react-router-dom";

const RequireManagerAuth = ({ children }) => {
  const auth = localStorage.getItem("auth");

  if (!auth) return <Navigate to="/" />;

  const { user, isAuthenticated } = JSON.parse(auth);

  if (!isAuthenticated || user.role !== "manager") {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireManagerAuth;
