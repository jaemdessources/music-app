import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongs,
  songs,
}) {
  const updateLibrary = (nextSong) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const getTime = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let targetIndex = currentIndex + direction;
    setCurrentSong(songs[targetIndex % songs.length] || songs[songs.length - 1]);
    updateLibrary(songs[targetIndex % songs.length] || songs[songs.length - 1]);
  };

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentIndex + 1) % songs.length] || songs[songs.length - 1]);
    updateLibrary(songs[(currentIndex + 1) % songs.length] || songs[songs.length - 1]);
  };

  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const trackAnim = {
    transform: `translateX(${Math.round(
      (songInfo.currentTime / songInfo.duration) * 100
    )}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime) || 0}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            value={songInfo.currentTime}
            type="range"
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipHandler(-1)}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipHandler(1)}
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default Player;
