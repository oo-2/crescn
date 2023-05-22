import React, { useEffect, useCallback } from "react";
import VolumeIcon from "./VolumeIcon";
import SkipForward from "../icons/SkipForward.svg";
import SkipBackward from "../icons/SkipBackward.svg";
import Play from "../icons/Play.svg";
import Pause from "../icons/Pause.svg";

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const MusicPlayer = ({
  track_name,
  artist_name,
  audioRef,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  volume,
  setVolume,
  handleTimeUpdate,
}) => {
  const handlePlayPause = useCallback(() => {
    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  }, [audioRef]);

  const isPaused = () => {
    if (audioRef.current) return audioRef.current.paused;
    return false;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        handlePlayPause();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlayPause]);

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume) {
      setVolume(parseFloat(storedVolume));
      audioRef.current.volume = storedVolume / 100;
    }
  });

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
    audioRef.current.play();
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    localStorage.setItem("volume", event.target.value);
    audioRef.current.volume = event.target.value / 100;
  };

  const muteAudio = () => {
    console.log(volume);
    console.log(audioRef.current.volume);
    setVolume(0);
    localStorage.setItem("volume", 0);
    audioRef.current.volume = 0;
  };

  const handleSeek = (event) => {
    const time = event.target.value;
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg w-full fixed bottom-0 left-0 right-0">
      <h2 className="pt-2 pb-2 bg-gray-600 rounded bg-opacity-80">
        {track_name} by {artist_name}
      </h2>
      <audio
        ref={audioRef}
        src={`http://10.0.0.63:3001/api/audio/${encodeURIComponent(
          `${track_name} - ${artist_name}`
        )}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className="mt-1 flex justify-center align-middle">
        <button onClick={() => (audioRef.current.currentTime -= 15)}>
          <img alt="Skip Backward" src={SkipBackward} />
        </button>
        <button for="slider" className="mx-1" onClick={handlePlayPause}>
          {isPaused() ? (
            <img alt="Play Button" src={Play} className="" />
          ) : (
            <img alt="Pause Button" src={Pause} />
          )}
        </button>
        <button onClick={() => (audioRef.current.currentTime += 15)}>
          <img alt="Skip Forward" src={SkipForward} />
        </button>
      </div>
      <div className="flex w-full items-center justify-center flex-wrap">
        <div className="container">
          <label for="slider" className="text-sm">
            {formatTime(currentTime)}
          </label>
          <input
            type="range"
            className="mx-2 w-1/3 accent-violet-400 hover:accent-violet-700 duration-300 cursor-pointer"
            min="0"
            max={audioRef.current ? audioRef.current.duration : "0"}
            value={currentTime}
            onChange={handleSeek}
          />
          <label for="slider" className="text-sm">
            {formatTime(duration)}
          </label>
        </div>
        <div className="md:right-0 md:absolute md:w-1/3 pl-9 flex flex-wrap">
          <button onClick={muteAudio}>
            <VolumeIcon volume={volume} />
          </button>
          <input
            id="vol"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="mx-2 md:w-1/3 w-3/5 accent-violet-400 hover:accent-violet-700 duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
