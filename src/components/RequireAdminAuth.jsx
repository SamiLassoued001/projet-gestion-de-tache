import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAdminAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = localStorage.getItem("isAdminAuthenticated") === "true";

    if (!user || user.role !== "admin" || !isAdmin) {
      navigate("/"); // redirection vers page d'accueil
    }
  }, [navigate]);

  return children;
};

export default RequireAdminAuth;
