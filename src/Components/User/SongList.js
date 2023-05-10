import React, { useEffect, useState } from "react";
import { FaHeadphones, FaRegClock, FaRegHeart, FaHeart } from "react-icons/fa";
import { Songs } from "./Songs";
import "../../styles/LeftMenu.css";
import { setCurrentSong } from "../../features/songSlice";
import { useDispatch } from "react-redux";
import { calculateTime } from "../../utils/helper";

export default function SongList({ data }) {
  const [songs, setSongs] = useState(data);
  const [song, setSong] = useState(data[0]?.file_url);
  const [img, setImage] = useState(data[0]?.image);
  const [name, setName] = useState(data[0]?.name);
  const [auto, setAuto] = useState(true);


  const dispatch = useDispatch();

  useEffect(() => {
    const allSongs = document.querySelectorAll(".songs");
    function changeActive() {
      allSongs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allSongs.forEach((n) => n.addEventListener("click", changeActive));
  }, []);

  const setMainSong = (file_url, image, name) => {
    setSong(file_url);
    setImage(image);
    setName(name);
    setAuto(true);
    dispatch(setCurrentSong({ song: file_url, name, imgSrc: image }));
  };

  return (
    <div className="songsContainer">
      {data &&
        data.map((song, index) => (
          <div
            className="songs"
            key={song?.id}
            onClick={() => setMainSong(song?.file_url, song?.image, song?.name)}
          >
            <div className="count">
              <p>{`#${index + 1}`}</p>
            </div>
            <div className="song">
              <div className="imgBox">
                <img src={song?.image} alt="" />
              </div>
              <div className="section">
                <p className="songName">
                  {song?.name} <span className="songSpan">{song?.singer}</span>
                </p>

                <div className="hits">
                  <p className="hit">
                    <i>
                      <FaHeadphones />
                    </i>
                    95,490,102
                  </p>

                  <p className="duration">
                    <i>
                      <FaRegClock />
                    </i>
                    {calculateTime(song?.duration)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
