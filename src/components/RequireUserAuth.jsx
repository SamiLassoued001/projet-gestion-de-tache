import { Navigate } from "react-router-dom";

const RequireUserAuth = ({ children }) => {
  const auth = localStorage.getItem("auth");

  if (!auth) return <Navigate to="/" />;

  const { user, isAuthenticated } = JSON.parse(auth);

  if (!isAuthenticated || user.role !== "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireUserAuth;
