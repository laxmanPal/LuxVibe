import React from "react";
import ClientNavbar from "../components/client/clientNavbar";
import Footer from "../components/client/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../utils/jwt";
import { useAuth } from "../store/AuthContext";

const ClientLayout = () => {
  const { user } = useAuth();
  if (user?.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
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
