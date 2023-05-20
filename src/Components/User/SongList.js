import React, { useEffect, useState } from "react";
import { FaHeadphones, FaRegClock, FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Songs } from "./Songs";
import "../../styles/LeftMenu.css";
import { setCurrentSong } from "../../features/songSlice";
import { useDispatch } from "react-redux";
import { calculateTime } from "../../utils/helper";
import AddToPlaylistDropdown from "./AddToPlaylistDropdown";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";
import { useDeleteSongFromPlaylistMutation } from "../../services/playlistAPIs";
import { toast } from "react-hot-toast";

export default function SongList({
  data,
  source,
  data_length,
  playlist_id,
  isPlaylist,
  refetch,
}) {
  // const [songs, setSongs] = useState(data);
  const [song, setSong] = useState(data ? data[0]?.file_url : "");
  const [img, setImage] = useState(data ? data[0]?.image : "");
  const [name, setName] = useState(data ? data[0]?.name : "");
  const [singer, setSinger] = useState(data ? data[0]?.singer : "");
  const [auto, setAuto] = useState(true);

  const dispatch = useDispatch();

  const [deleteSongFromPlaylist] = useDeleteSongFromPlaylistMutation();

  const handleRemoveFromPlaylist = async (event, songId) => {
    event.stopPropagation();
    await deleteSongFromPlaylist({ songId: songId, playlistId: playlist_id });
    refetch();

    toast.success("Song removed");
    console.log(songId, playlist_id);
  };

  useEffect(() => {
    const allSongs = document.querySelectorAll(".songs");
    function changeActive() {
      allSongs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allSongs.forEach((n) => n.addEventListener("click", changeActive));
  }, []);

  const setMainSong = (file_url, image, name, singer, index, id) => {
    setSong(file_url);
    setImage(image);
    setName(name);
    setSinger(singer);
    setAuto(true);
    dispatch(
      setCurrentSong({
        song: file_url,
        name,
        imgSrc: image,
        singer,
        index,
        source,
        data_length,
        playlist_id,
        id,
      })
    );
  };

  return (
    <div className="songsContainer">
      {data?.map((song, index) => (
        <div
          className="songs"
          key={song?.id}
          onClick={() =>
            setMainSong(
              song?.file_url,
              song?.image,
              song?.name,
              song?.singer,
              index,
              song?.id
            )
          }
        >
          {/* id accend */}
          <div className="count">
            <p>{`#${index + 1}`}</p>
          </div>

          {/* image & name & singer*/}
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

          {/* option add to playlist */}
          {isPlaylist ? (
            <Tooltip title="Remove from playlist">
              <ClearIcon
                fontSize="small"
                sx={{ color: "#3498db" }}
                onClick={(e) => handleRemoveFromPlaylist(e, song.id)}
              />
            </Tooltip>
          ) : (
            <AddToPlaylistDropdown song={song} />
          )}
        </div>
      ))}
    </div>
  );
}
