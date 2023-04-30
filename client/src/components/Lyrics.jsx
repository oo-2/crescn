import React, { useState, useEffect, useRef } from 'react';

const Lyrics = ({ track_name, artist_name, lyrics }) => {

  const audioRef = useRef(null);
  const lyricsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  function handleTimeUpdate() {
    if (!audioRef.current) return;
    
    const currentTime = (audioRef.current.currentTime * 1000);
    if (lyrics.length < 1) return;
    const index = lyrics.findIndex(lyric => lyric.startTimeMs <= currentTime && lyric.endTimeMs > currentTime);
    setActiveIndex(index);
  }
  useEffect(() => {
    if (activeIndex !== null && activeIndex !== -1) {
      const activeLyricElement = lyricsRef.current.children[activeIndex];
      if (activeLyricElement !== null)
        activeLyricElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]); 

  function handleLyricClick(event, startTimeMs) {
    event.preventDefault();
    audioRef.current.currentTime = startTimeMs / 1000;
    audioRef.current.play()
  }

  return (
    <div class="text-white w-full divide-y divide-gray-500 focus:ring-2 mt-3 drop-shadow">
      <h2 class="pt-2 pb-2 bg-gray-700 rounded bg-opacity-80">{track_name} by {artist_name}</h2>
      <ul class=" bg-gray-800 rounded bg-opacity-40 border-gray-700 ">
      {lyrics.length > 0 ? (
  <ul ref={lyricsRef}>
    {lyrics.map((lyric, index) => (
      <li
        key={lyric.startTimeMs}
        onClick={(event) => handleLyricClick(event, lyric.startTimeMs)}
        className={index === activeIndex ? 'rounded text-gray-100 bg-purple-700 py-1 px-3 leading-7 transition-colors ease-in-out ' : `hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-1 px-3 leading-7 transition-colors ease-in-out `}
      >
        <p>{lyric.words}</p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-base text-gray-100 py-1 px-3">No lyrics found</p>
)}

<audio autoPlay={true} id={track_name} ref={audioRef} onTimeUpdate={handleTimeUpdate} volume={0.1}>
  <source src={`http://localhost:3001/api/audio/${encodeURIComponent(`${track_name} - ${artist_name}`)}`} type="audio/mp4" />
</audio>
        </ul>
    </div>
    
  );
};

export default Lyrics;