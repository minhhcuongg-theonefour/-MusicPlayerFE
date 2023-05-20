import React from "react";
import "../../styles/LeftMenu.css";
import SongList from "./SongList";

function AudioList({
  data,
  source,
  data_length,
  playlist_id,
  isPlaylist,
  refetch,
}) {
  return (
    <div className="AudioList">
      <h2 className="title">
        List songs <span></span>
      </h2>
      <SongList
        refetch={refetch}
        isPlaylist={isPlaylist}
        data={data?.songs}
        source={source}
        data_length={data_length}
        playlist_id={playlist_id}
      />
      {/* <MusicPlayer song={song} imgSrc={img} name={name} autoplay={auto} /> */}
    </div>
  );
}

export { AudioList };
