import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MusicPlayer from "./MusicPlayer";
import { Songs } from "./Songs";

const Layout = () => {
  return (
    <>
      <LeftMenu />
      <div className="mainContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <MusicPlayer
          song={Songs[0].song}
          auto={true}
          name={Songs[0].songName}
          imgSrc={Songs[0].imgSrc}
        />
      </div>
      <RightMenu />
    </>
  );
};

export default Layout;
