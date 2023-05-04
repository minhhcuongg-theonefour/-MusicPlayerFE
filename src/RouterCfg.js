import React from "react";
import { lazy } from "react";
import MainContainer from "./Components/MainContainer";

// Layout
const Layout = lazy(() => import("./Components/Layout"));

// const MainContainer = lazy(() => import("./Components/MainContainer"));

const RouterCfg = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainContainer />,
      },
    ],
  },
];

export default RouterCfg;
