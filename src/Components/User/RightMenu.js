import React from "react";
import "../../styles/RightMenu.css";
import { FaCrown, FaBell, FaRegHeart, FaSun, FaCogs } from "react-icons/fa";
import Profile from "../../img/profile.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  selectCurrentAccessToken,
  selectCurrentUser,
  selectCurrentUserImage,
} from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "@mui/joy";
import LoginIcon from "@mui/icons-material/Login";

function RightMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentAccessToken);
  const userImage = user ? useSelector(selectCurrentUserImage) : null;

  const navigate = useNavigate();

  return (
    <>
      <div className="rightContainer">
        <div className="profile">
          {token ? (
            <>
              <div className="profileImage">
                <Avatar src={userImage} />
              </div>
              <Link to="/user/profile">
                <AccountCircleIcon sx={{ color: "#fff", mt: "20px" }} />
              </Link>
              <Link>
                <LogoutIcon
                  onClick={() => dispatch(logout())}
                  sx={{ color: "#fff", mt: "20px" }}
                />
              </Link>
            </>
          ) : (
            <div onClick={() => window.location.replace("/login")}>
              <LoginIcon sx={{ color: "#fff", mt: "20px" }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RightMenu;
