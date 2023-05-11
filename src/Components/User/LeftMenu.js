import React from "react";
import "../../styles/LeftMenu.css";
import { FaSpotify, FaEllipsisH } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { FiMusic } from "react-icons/fi";
import { Menu } from "./Menu";
import { MenuList } from "./MenuList";
import { MenuPlayList } from "./MenuPlayList";
import TrackList from "./TrackList";
import {
  currentImg,
  currentSingerName,
  currentSongName,
} from "../../features/songSlice";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../../features/authSlice";

function LeftMenu() {
  const songName = useSelector(currentSongName);
  const singerName = useSelector(currentSingerName);
  const token = useSelector(selectCurrentAccessToken);
  const img = useSelector(currentImg);

  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <div className="logo">
          <i>
            <FiMusic />
          </i>

          <h2>B2CD</h2>
        </div>

        <i>
          <FaEllipsisH />
        </i>
      </div>

      <div className="searchBox">
        <input type="text" placeholder="Search..." />
        <i>
          <BiSearchAlt />
        </i>
      </div>

      <Menu title={"Menu"} listObject={MenuList} />
      {token ? <MenuPlayList /> : ""}

      <TrackList trackName={songName} artistName={singerName} img={img}/>
    </div>
  );
}

export default LeftMenu;
