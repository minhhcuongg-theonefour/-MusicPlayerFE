import React from "react";
import "../../styles/LeftMenu.css";
import Track from "../../img/track.png";
import { BsFillVolumeUpFill, BsMusicNoteList } from "react-icons/bs";
import { FaDesktop } from "react-icons/fa";

function TrackList({ trackName, artistName, img }) {
  return (
    <div className="trackList">
      <div className="top">
        <img src={img} />
        <p>
          {trackName} <span>{artistName}</span>
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
