import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const LayoutDefault = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutDefault;
