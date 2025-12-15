import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import HeaderClient from "../Header/HeaderClient";

const LayoutDefault = () => {
  return (
    <>
      <HeaderClient />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default LayoutDefault;
