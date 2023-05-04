import React from "react";
import { Outlet } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

const Layout = () => {
  return (
    <>
      <LeftMenu />
      <Outlet />
      <RightMenu />
    </>
  );
};

export default Layout;
