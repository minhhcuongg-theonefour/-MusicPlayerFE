import React from "react";
import "../styles/LeftMenu.css";
import SongList from "./SongList";

function AudioList() {
  return (
    <div className="AudioList">
      <h2 className="title">
        The list <span>12 songs</span>
      </h2>
      <SongList /> 
      {/* <MusicPlayer song={song} imgSrc={img} name={name} autoplay={auto} /> */}
    </div>
  );
}

export { AudioList };
