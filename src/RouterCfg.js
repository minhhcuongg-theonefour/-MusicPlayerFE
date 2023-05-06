import React from "react";
import { lazy } from "react";

// Layout
const Layout = lazy(() => import("./Components/Layout"));
const Home = lazy(() => import("./Components/Home"));
const MainContainer = lazy(() => import("./Components/MainContainer"));
const Login = lazy(() => import("./Components/Login"));
const Library = lazy(() => import("./Components/Library"));
const Profile = lazy(() => import("./Components/Profile.js"));

const RouterCfg = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "library/:id", element: <MainContainer /> },
      { path: "library", element: <Library /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default RouterCfg;
