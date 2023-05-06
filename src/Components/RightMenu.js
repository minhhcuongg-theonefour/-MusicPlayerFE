import React from "react";
import "../styles/RightMenu.css";
import { FaCrown, FaBell, FaRegHeart, FaSun, FaCogs } from "react-icons/fa";
import Profile from "../img/profile.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function RightMenu() {
  return (
    <>
      <div className="rightContainer">
        <div className="profile">
          <div className="profileImage">
            <img src={Profile} alt="" />
          </div>
        </div>
        <Link to="/profile">
          <AccountCircleIcon sx={{ color: "#fff", mt: "20px" }} />
        </Link>
        <Link>
          <LogoutIcon sx={{ color: "#fff", mt: "20px" }} />
        </Link>
      </div>
    </>
  );
}

export default RightMenu;
