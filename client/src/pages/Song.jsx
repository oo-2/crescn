import React, { useState, useRef } from "react";
import MusicPlayer from "../components/MusicPlayer";
import Lyrics from "../components/Lyrics";

const SongPage = ({ track_name, artist_name, lyrics }) => {
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(25);
  const [duration, setDuration] = useState(0);

  function handleTimeUpdate() {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    const currentSecond = audioRef.current.currentTime * 1000;
    if (lyrics.length < 1) return;
    const index = lyrics.findIndex(
      (lyric) =>
        lyric.startTimeMs <= currentSecond && lyric.endTimeMs > currentSecond
    );
    setActiveIndex(index);
  }

  return (
    <div class="flex flex-col w-full">
      <MusicPlayer
        
        track_name={track_name}
        artist_name={artist_name}
        audioRef={audioRef}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        setDuration={setDuration}
        handleTimeUpdate={handleTimeUpdate}
        volume={volume}
        setVolume={setVolume}
      />
      <Lyrics audioRef={audioRef} lyrics={lyrics} activeIndex={activeIndex}/>
    </div>
  );
};

export default SongPage;
