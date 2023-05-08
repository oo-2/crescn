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

  function handleLyricClick(event, startTimeMs) {
    event.preventDefault();
    audioRef.current.currentTime = startTimeMs / 1000;
  }

  return (
    <div class="text-white mt-3">
      <ul class=" bg-gray-800 rounded border-gray-700 ">
        {lyrics.length > 0 ? (
          <ul ref={lyricsRef}>
            {lyrics.map((lyric, index) => (
              <li
                key={lyric.startTimeMs}
                onClick={(event) => handleLyricClick(event, lyric.startTimeMs)}
                className={
                  index === activeIndex
                    ? `rounded text-gray-100 text-lg bg-purple-700 py-1 px-3 leading-7 transition-colors ease-in-out `
                    : `hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-1 px-3 leading-7 transition-colors ease-in-out `
                }
              >
                <p>{lyric.words}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-gray-100 py-1 px-3">No lyrics found</p>
        )}
      </ul>
    </div>
  );
};

export default Lyrics;
