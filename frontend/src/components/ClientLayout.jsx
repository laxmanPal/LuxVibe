import React from "react";
import ClientNavbar from "./clientNavbar";
import Footer from "./Footer";
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
