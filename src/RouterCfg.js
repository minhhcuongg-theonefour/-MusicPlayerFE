import React from "react";
import { lazy } from "react";

// {*****---User Layout---*****}
const Layout = lazy(() => import("./Components/User/Layout"));

// {*****---Protected Route---*****}
const RequireAuth = lazy(() => import("./features/requireAuth"));

// {*****User Route---*****}
const Home = lazy(() => import("./Components/User/Home"));
const MainContainer = lazy(() => import("./Components/User/MainContainer"));
const Login = lazy(() => import("./Components/User/Login"));
const Library = lazy(() => import("./Components/User/Library"));
const Profile = lazy(() => import("./Components/User/Profile"));
const Register = lazy(() => import("./Components/User/Register"));
const Playlist = lazy(() => import("./Components/User/PlayList"));

// {*****Admin Route---*****}
const Dashboard = lazy(() => import("./Components/Admin/Dashboard"));
const LayoutAdmin = lazy(() => import("./Components/Admin/Layout"));
const ManageSong = lazy(() =>
  import("./Components/Admin/ManageSong/MangeSong")
);
const ManageGenres = lazy(() =>
  import("./Components/Admin/ManageGenres/ManageGenres")
);
const ManageSongDetails = lazy(() =>
  import("./Components/Admin/ManageSong/ManageSongDetails")
);
const ManagaGenresDetails = lazy(() =>
  import("./Components/Admin/ManageGenres/ManageGenresDetails.js")
);
const AddSong = lazy(() => import("./Components/Admin/ManageSong/AddSong"));

const RouterCfg = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "genre/:id", element: <MainContainer /> },
    ],
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "library", element: <Library /> },
          { path: "profile", element: <Profile /> },
          { path: "playlist/:id", element: <Playlist /> },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "manage-song", element: <ManageSong /> },
          { path: "manage-genres", element: <ManageGenres /> },
          {
            path: "manage-genres-details/:id",
            element: <ManagaGenresDetails />,
          },
          { path: "manage-song-details/:id", element: <ManageSongDetails /> },
          { path: "add-song", element: <AddSong /> },
        ],
      },
    ],
  },
];

export default RouterCfg;
