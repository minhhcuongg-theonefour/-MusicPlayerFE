import React from "react";
import "../../styles/LeftMenu.css";
import Track from "../../img/track.png";
import { BsFillVolumeUpFill, BsMusicNoteList } from "react-icons/bs";
import { FaDesktop } from "react-icons/fa";

function TrackList({ trackName, artistName, img }) {
  return (
    <div className="trackList">
      <div className="top">
        <img
          src={
            img
              ? img
              : "https://res.cloudinary.com/doqhasjec/image/upload/v1683789765/B2CDMusic/defaultPlaylist_vco9j8.png"
          }
        />
        <p>
          {trackName ? trackName : "No song is playing currently"} <span>{artistName}</span>
        </p>
      </div>

      <div className="bottom">
        <i>
          <BsFillVolumeUpFill />
        </i>

        <input type="range" />

        <i>
          <BsMusicNoteList />
        </i>
      </div>
    </div>
  );
}

export default TrackList;
