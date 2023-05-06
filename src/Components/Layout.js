import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MusicPlayer from "./MusicPlayer";
import { useSelector } from "react-redux";

const Layout = () => {
  const song = useSelector((state) => state.song);

  return (
    <>
      <LeftMenu />
      <div className="mainContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      {song.name && (
        <MusicPlayer
          song={song.song}
          auto={true}
          name={song.name}
          imgSrc={song.imgSrc}
        />
      )}
      <RightMenu />
    </>
  );
};

export default Layout;
