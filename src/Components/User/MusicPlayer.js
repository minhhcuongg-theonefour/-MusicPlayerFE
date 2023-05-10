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
import {BsShuffle} from "react-icons/bs";
import {ImLoop} from "react-icons/im"
import { calculateTime } from "../../utils/helper";

function MusicPlayer({ song, imgSrc, name, auto }) {
  const [isLove, setLove] = useState(false);
  const [isPlaying, setPlay] = useState(true);
  //   duration state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);

  const audioPlayer = useRef(); //   reference to our audio component
  const progressBar = useRef(); //   reference to our prgressbar
  const animationRef = useRef(); //  reference to our animation

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
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

    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrenttime(progressBar.current.value);

    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrenttime(progressBar.current.value);
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
            <div className="back">
              <i>
                <BsShuffle />
              </i>
              <i>
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
            <div className="forward">
              <i>
                <FaStepForward />
              </i>
              <i>
                <ImLoop />
              </i>
            </div>
          </div>

          <div className="right">
            <i>
              <FaShareAlt />
            </i>
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
