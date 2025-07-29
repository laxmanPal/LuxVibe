import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // not logged in
    return <Navigate to="/auth/login" replace />;
  }

  if (!user.isAdmin) {
    // logged in but not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
