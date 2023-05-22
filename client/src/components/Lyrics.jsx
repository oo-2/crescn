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
    <div class="text-white w-full text-center text-lg">
        {lyrics.length > 0 ? (
          <ul className=" bg-gray-800 rounded" ref={lyricsRef}>
            {lyrics.map((lyric, index) => (
              <li
                key={lyric.startTimeMs}
                onClick={(event) => handleLyricClick(event, lyric.startTimeMs)}
                className={
                  index === activeIndex
                    ? `rounded text-gray-100 text-xl bg-purple-700 py-1 leading-7 transition-colors ease-in-out `
                    : `hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-2 transition-colors ease-in-out `
                }
              >
                <p>{lyric.words}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-screen flex bg-gray-800">
            <p className="m-auto text-2xl">No lyrics found</p>
          </div>
        )}
    </div>
  );
};

export default Lyrics;
