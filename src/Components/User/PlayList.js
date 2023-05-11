import React, { useEffect } from "react";
import "../../styles/MainContainer.css";
import { AudioList } from "./AudioList";
import { BannerPlaylist } from "./BannerPlaylist";
import { useParams } from "react-router-dom";
import { useGetDetailsPlaylistQuery } from "../../services/playlistAPIs";

function Playlist() {
  const id = useParams();

  const {data: playlist, isFetching: playlistFetching} = useGetDetailsPlaylistQuery(id);

  return (
    <>
      <BannerPlaylist playlist={playlist}/>
      <div className="menuList"></div>
      <AudioList data={playlist} />
    </>
  );
}

export default Playlist;
