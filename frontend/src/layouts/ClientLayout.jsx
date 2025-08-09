import React from "react";
import Footer from "../components/client/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../utils/jwt";
import { useAuth } from "../store/AuthContext";
import ClientNavbar from "../components/client/ClientNavbar";

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
