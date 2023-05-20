import React, { useEffect } from "react";
import "../../styles/MainContainer.css";
import { AudioList } from "./AudioList";
import { BannerPlaylist } from "./BannerPlaylist";
import { useParams } from "react-router-dom";
import { useGetuserPlaylistQuery } from "../../services/playlistAPIs";
import NoSongBox from "./NoSongBox";

function Playlist() {
  const { id } = useParams();

  const {
    data: playlist,
    isFetching: playlistFetching,
    refetch,
  } = useGetuserPlaylistQuery(id, "userPlaylist", {
    refetchOnMountOrArgChange: true,
  });

  var totalSong = playlist?.songs.length;

  console.log(totalSong);

  return totalSong ? (
    <div>
      <BannerPlaylist playlist={playlist} id={id} />
      <div className="menuList"></div>
      {!playlistFetching && (
        <AudioList
          refetch={refetch}
          isPlaylist={true}
          data={playlist}
          source="playlist"
          data_length={playlist?.songs?.length}
          playlist_id={playlist?.id}
        />
      )}
    </div>
  ) : (
    <div>
      <BannerPlaylist playlist={playlist} id={id} />
      <NoSongBox />
    </div>
  );
}

export default Playlist;
