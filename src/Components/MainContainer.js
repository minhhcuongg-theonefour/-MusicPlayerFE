import React, { useEffect } from "react";
import "../styles/MainContainer.css";
import { FaUsers } from "react-icons/fa";
import { AudioList } from "./AudioList";
import { Banner } from "./Banner";
import MusicPlayer from "./MusicPlayer";
import { Songs } from "./Songs";

function MainContainer() {
  // useEffect(() => {
  //   const allLi = document.querySelector(".menuList").querySelectorAll("li");

  //   function changePopularActive() {
  //     allLi.forEach((n) => n.classList.remove("active"));
  //     this.classList.add("active");
  //   }

  //   allLi.forEach((n) => n.addEventListener("click", changePopularActive));
  // }, []);

  return (
    <div className="mainContainer">
      {/* <Banner /> */}

      {/* <div className="menuList">

      </div> */}

      {/* <AudioList /> */}
      <MusicPlayer song={Songs[0].song} auto={false} name={Songs[0].songName} imgSrc={Songs[0].imgSrc} />
    </div>
  );
}

export default MainContainer;
