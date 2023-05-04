import React, { useEffect } from "react";
import "../styles/MainContainer.css";
import { AudioList } from "./AudioList";
import { Banner } from "./Banner";

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
    <>
      <Banner />
      <div className="menuList"></div>
      <AudioList />
    </>
  );
}

export default MainContainer;
