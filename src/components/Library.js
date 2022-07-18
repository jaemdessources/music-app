import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setSongs, audioRef, setCurrentSong, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            key={song.id}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
