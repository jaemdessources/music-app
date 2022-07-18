import React from "react";
// adding components

function LibrarySong({ song, songs, setCurrentSong, setSongs }) {
  const selectSongHandler = () => {
    //add active state
    let id = song.id;
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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

    setCurrentSong(song);
  };
  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={selectSongHandler}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
