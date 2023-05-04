import React from "react";
import "../styles/RightMenu.css";
import { FaCrown, FaBell, FaRegHeart, FaSun, FaCogs } from "react-icons/fa";
import Profile from "../img/profile.jpg";

function RightMenu() {
  return (
    <div className="rightContainer">
      <div className="profile">

        <div className="profileImage">
          <img src={Profile} alt="" />
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
