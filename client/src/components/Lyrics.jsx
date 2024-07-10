import React, { useEffect, useRef } from "react";

const Lyrics = ({ audioRef, lyrics, activeIndex }) => {
  const lyricsRef = useRef(null);

  useEffect(() => {
    if (activeIndex !== null && activeIndex !== -1) {
      const activeLyricElement = lyricsRef.current.children[activeIndex];
      if (activeLyricElement !== null)
        activeLyricElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  }, [activeIndex]);

  function handleLyricClick(startTimeMs, endTimeMs) {
    if (endTimeMs) audioRef.current.currentTime = startTimeMs / 1000;
  }

  return (
    <div className="w-full text-center bg-gray-800 h-screen overflow-auto">
      {lyrics.length > 0 ? (
        <ul ref={lyricsRef}>
          {lyrics.map((lyric, index) => (
            <li
              key={index}
              onClick={() =>
                handleLyricClick(lyric.startTimeMs, lyric.endTimeMs)
              }
              className={
                index === activeIndex
                  ? `text-white text-xl py-2 transition-colors ease-in-out duration-150 bg-purple-700`
                  : `text-gray-100 text-lg py-2 text-opacity-80 transition-colors ease-linear duration-200 hover:bg-purple-900 hover:text-opacity-100`
              }
            >
              <p>{lyric.words}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-screen flex">
          <p className="m-auto text-white text-2xl">No lyrics found</p>
        </div>
      )}
    </div>
  );
};

export default Lyrics;
