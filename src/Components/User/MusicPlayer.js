import React, { useState, useRef, useEffect } from "react";
import "../../styles/MusicPlayer.css";
import {
  FaRegHeart,
  FaHeart,
  FaForward,
  FaStepForward,
  FaStepBackward,
  FaBackward,
  FaPlay,
  FaPause,
  FaShareAlt,
} from "react-icons/fa";
import { BsShuffle } from "react-icons/bs";
import { ImLoop } from "react-icons/im";
import { calculateTime } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  currentIndex,
  currentLength,
  currentPlaylistId,
  currentSongId,
  currentSource,
  setCurrentIndexSong,
  setCurrentSong,
} from "../../features/songSlice";
import { useGetSongByControlQuery } from "../../services/songAPIs";
import { useGetSongsQuery } from "../../services/songAPIs";

function MusicPlayer({ song, imgSrc, name, auto }) {
  const [isLove, setLove] = useState(false);
  const [isPlaying, setPlay] = useState(true);
  const [isLoop, setLoop] = useState(false);
  //   duration state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);

  const audioPlayer = useRef(); //   reference to our audio component
  const progressBar = useRef(); //   reference to our prgressbar
  const animationRef = useRef(); //  reference to our animation

  const sourceSong = useSelector(currentSource);
  const indexSong = useSelector(currentIndex);
  const [direction, setDirection] = useState("");
  const [currIndex, setCurrIndex] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);

  const data_length = useSelector(currentLength);
  const playlist_id = useSelector(currentPlaylistId);
  const songId = useSelector(currentSongId);

  const { data, isFetching } = useGetSongByControlQuery(
    {
      index: currIndex,
      direction: direction,
      playlistId: playlist_id,
      source: sourceSong,
      isShuffle,
      songId: songId,
    },
    {
      skip: !direction,
      refetchOnMountOrArgChange: true,
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(direction);
    if (!isFetching && data) {
      console.log(data);
      dispatch(
        setCurrentSong({
          imgSrc: data?.image,
          song: data?.file_url,
          name: data?.name,
          singer: data?.singer,
          id: data?.id,
        })
      );
      setDirection("");
    }
  }, [isFetching, data]);

  const whilePlaying = () => {
    if (progressBar.current?.value) {
      progressBar.current.value = audioPlayer?.current?.currentTime;
    }

    changeCurrentTime();
    // need to run more than once
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioPlayer?.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }

    let seconds;

    audioPlayer.current.addEventListener("loadedmetadata", (e) => {
      seconds = e.target.duration;
      setDuration(seconds);
      progressBar.current.max = seconds;
    });
    return () => {
      audioPlayer.current.removeEventListener("loadedmetadata", () => {});
    };
  }, [song]);

  const changePlayPause = () => {
    const prevValue = isPlaying;
    setPlay(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
    }
  };

  const changeProgress = () => {
    audioPlayer.current.currentTime = progressBar.current.value;

    if (progressBar.current?.style) {
      progressBar.current?.style.setProperty(
        "--played-width",
        `${(progressBar.current.value / duration) * 100}%`
      );
      setCurrenttime(progressBar.current.value);
    }

    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    if (progressBar.current?.style) {
      progressBar.current?.style.setProperty(
        "--played-width",
        `${(progressBar.current?.value / duration) * 100}%`
      );
      setCurrenttime(progressBar.current.value);
    }
  };

  const handleNextSong = () => {
    if (indexSong < data_length - 1) {
      setCurrIndex(indexSong);
      dispatch(setCurrentIndexSong({ index: indexSong + 1 }));
      setDirection("next");
    }
  };

  const handlePrevSong = () => {
    if (indexSong > 0) {
      setCurrIndex(indexSong);
      dispatch(setCurrentIndexSong({ index: indexSong - 1 }));
      setDirection("prev");
    }
  };

  const shuffleSong = () => {
    setIsShuffle((prev) => !prev);
    console.log("eee");
  };

  const handleLoop = () => {
    console.log("this clicked");
    
  };

  const changeSongLove = () => {
    setLove(!isLove);
  };

  return (
    <div className="musicPlayer">
      <div className="songImage">
        <img src={imgSrc} alt="" />
      </div>
      <div className="songName">{/* <h3>{name}</h3> */}</div>
      <div className="songAttributes">
        <audio src={song} preload="metadata" ref={audioPlayer} />
        <div className="top">
          <div className="left">
            {/* <div className="loved" onClick={changeSongLove}>
              {isLove ? (
                <i>
                  <FaRegHeart />
                </i>
              ) : (
                <i>
                  <FaHeart />
                </i>
              )}
            </div> */}
            {/* <i className="download">
              <BsDownload />
            </i> */}
          </div>

          <div className="middle">
            <div className="forward">
              <i onClick={shuffleSong}>
                {isShuffle ? (
                  <BsShuffle style={{ color: "#27b7b7" }} />
                ) : (
                  <BsShuffle style={{ color: "#9a9a9a" }} />
                )}
              </i>
              <i onClick={handlePrevSong}>
                <FaStepBackward />
              </i>
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            <div className="back">
              <i onClick={handleNextSong}>
                <FaStepForward style={{ color: "#9a9a9a" }} />
              </i>
            </div>
            <div className="back" onClick={handleLoop}>
              {isLoop ? (
                <i>
                  <ImLoop style={{ color: "#27b7b7" }} />
                </i>
              ) : (
                <i>
                  <ImLoop style={{ color: "#9a9a9a" }} />
                </i>
              )}
            </div>
          </div>

          <div className="right">
            <i>{/* <FaShareAlt /> */}</i>
          </div>
        </div>

        <div className="bottom">
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <input
            type="range"
            className="progressBar"
            ref={progressBar}
            defaultValue="0"
            onChange={changeProgress}
            autoPlay={auto}
          />
          <div className="duration">
            {!isNaN(duration) ? calculateTime(duration) : "00:00"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
