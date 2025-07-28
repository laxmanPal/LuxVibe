import React from "react";
import { decodeToken } from "../../utils/jwt";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const storedToken = localStorage.getItem("accessToken");

  if (!storedToken) {
    return <Navigate to={"/auth/login"} />;
  }
  const token = decodeToken(storedToken);

  return token && !token.isAdmin ? children : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
