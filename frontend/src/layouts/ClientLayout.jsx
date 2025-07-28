import React from "react";
import ClientNavbar from "../components/client/clientNavbar";
import Footer from "../components/client/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../utils/jwt";

const ClientLayout = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const { isAdmin } = decodeToken(token);
      if (isAdmin) {
        return <Navigate to="/admin" replace />;
      }
    } catch (error) {
      return <Navigate to="/auth/login" replace />;
    }
  }
  return (
    <>
      <ClientNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
