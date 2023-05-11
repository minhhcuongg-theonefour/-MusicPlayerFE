import React, { useEffect } from "react";
import "../../styles/MainContainer.css";
import { AudioList } from "./AudioList";
import { Banner } from "./Banner";
import { useGetGenreDetailsQuery } from "../../services/genresAPIs";
import { useParams } from "react-router-dom";

function MainContainer() {
  // useEffect(() => {
  //   const allLi = document.querySelector(".menuList").querySelectorAll("li");

  //   function changePopularActive() {
  //     allLi.forEach((n) => n.classList.remove("active"));
  //     this.classList.add("active");
  //   }

  //   allLi.forEach((n) => n.addEventListener("click", changePopularActive));
  // }, []);

  const id = useParams();

  const { data: genreDetail, isFetching: genreDetailFetching } =
    useGetGenreDetailsQuery(id);

  console.log("this is data:", genreDetail);

  return (
    <>
      <Banner genreDetail={genreDetail} genreDetailFetching={genreDetailFetching}/>
      <div className="menuList"></div>
      <AudioList
        data={genreDetail}
      />
    </>
  );
}

export default MainContainer;
