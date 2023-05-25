import React, { useEffect, useState } from "react";
import SkipButton from "./SkipButton";
import PlayPauseButton from "./PlayPauseButton";
import SeekBarSlider from "./SeekBarSlider";
import VolumeSlider from "./VolumeSlider";
import CopyLink from "./CopyLinkButton";

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
  const [buffering, setBuffering] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;
    const audioElement = audioRef.current;
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume) {
      setVolume(parseFloat(storedVolume));
      audioRef.current.volume = storedVolume / 100;
    }

    audioElement.addEventListener("loadstart", () => setBuffering(true));
    audioElement.addEventListener("seeking", () => setBuffering(true));
    audioElement.addEventListener("canplay", () => setBuffering(false));
    audioElement.addEventListener("ended", () => setPaused(true));
    return () => {
      audioElement.removeEventListener("loadstart", () => setBuffering(true));
      audioElement.removeEventListener("seeking", () => setBuffering(true));
      audioElement.removeEventListener("canplay", () => setBuffering(false));
      audioElement.addEventListener("ended", () => setPaused(true));
    };
  }, [setVolume, audioRef, buffering]);

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg w-full fixed bottom-0 left-0 right-0">
      <div className="bg-gray-600 py-2 rounded bg-opacity-80 flex justify-center">
        <div className="flex flex-wrap">
          <h2 className="pr-2">
            {track_name} by {artist_name}
          </h2>
        </div>
        <CopyLink />
      </div>
      <audio
        ref={audioRef}
        src={`http://localhost:3001/api/audio/${encodeURIComponent(
          `${track_name} - ${artist_name}`
        )}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className="m-1 flex justify-center align-middle">
        <SkipButton seconds={-15} audioRef={audioRef} buffering={buffering} />
        <PlayPauseButton
          paused={paused}
          setPaused={setPaused}
          audioRef={audioRef}
          buffering={buffering}
        />
        <SkipButton seconds={15} audioRef={audioRef} buffering={buffering} />
      </div>
      <div className="flex w-full items-center justify-center flex-wrap">
        <div className="container">
          <SeekBarSlider
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            audioRef={audioRef}
            duration={duration}
          />
        </div>
        <div className="md:right-0 md:absolute md:w-1/3 pl-9 flex flex-wrap">
          <VolumeSlider
            volume={volume}
            setVolume={setVolume}
            audioRef={audioRef}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
