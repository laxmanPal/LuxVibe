import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import PageLoader from "../UI/PageLoader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10"> <PageLoader/> </div>;
  }

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
