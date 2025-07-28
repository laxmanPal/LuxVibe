import React from "react";
import ClientNavbar from "../components/client/clientNavbar";
import Footer from "../components/client/Footer";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <>
      <ClientNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
