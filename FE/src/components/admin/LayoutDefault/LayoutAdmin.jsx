import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "~/components/admin/Header/Header";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import "./LayoutAdmin.scss";

const LayoutAdmin = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <Layout className="layout__default">
        <Header collapse={collapse} setCollapse={setCollapse} />

        <Layout>
          <Sidebar />

          <Content className="layout__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
