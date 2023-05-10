import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MusicPlayer from "./MusicPlayer";
import { useSelector } from "react-redux";
import { persistor, store } from "../../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { selectCurrentAccessToken } from "../../features/authSlice";

const Layout = () => {
  const song = useSelector((state) => state.song);
  const token = useSelector(selectCurrentAccessToken);
  console.log(song)

  return (
    <>
      <LeftMenu />
      <div className="mainContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <PersistGate loading={null} persistor={persistor}>
            <Outlet />
          </PersistGate>
        </Suspense>
      </div>
      {song?.name && (
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
