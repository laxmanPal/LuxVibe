import { Navigate } from "react-router-dom";
import { decodeToken } from "../../utils/jwt";

const AdminRoute = ({ children }) => {
  const storedToken = localStorage.getItem("accessToken");

  if (!storedToken) {
    return <Navigate to={"/auth/login"} replace />;
  }

  const token = decodeToken(storedToken);

  return token?.isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
