import React from "react";
// adding components

function Song({ currentSong, isPlaying }) {
  return (
    <div className="song-container">
      <img
        className={isPlaying ? "rotating" : ""}
        alt={currentSong.name}
        src={currentSong.cover}
      ></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
