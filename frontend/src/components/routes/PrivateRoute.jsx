import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }


  if (user.isAdmin) {
    // prevent admin from accessing user routes
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
