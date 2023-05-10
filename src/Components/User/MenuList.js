import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import React from "react";
import {BiLibrary} from "react-icons/bi";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import { BiPulse } from "react-icons/bi";
import { FaBroadcastTower, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";

const MenuList = [
  {
    id: 1,
    icon: <BsFillHouseFill />,
    name: "Home",
    path: "/"
  },

  // {
  //   id: 2,
  //   icon: <BsJournalAlbum />,
  //   name: "Albums",
  // },

  {
    id: 3,
    icon: <BiLibrary />,
    name: "Your library",
    path: "/user/library"
  },

  // {
  //   id: 4,
  //   icon: <MdOutlineFavoriteBorder />,
  //   name: "Favourites",
  // }

];

export { MenuList };
