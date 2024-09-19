import React, { useEffect, useState } from "react";
import SkipButton from "./SkipButton";
import PlayPauseButton from "./PlayPauseButton";
import SeekBarSlider from "./SeekBarSlider";
import VolumeSlider from "./VolumeSlider";

const MusicPlayer = ({
  roomId,
  socket,
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
  const [paused, setPaused] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume) {
      setVolume(parseFloat(storedVolume));
      audioRef.current.volume = storedVolume / 100;
    }
  }, [setVolume, audioRef]);

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const endofSong = (index) => {
    if (socket.connected)
    socket.emit("queueRemove", {roomId, index});
    const pause = 0;
    socket.emit("songPaused", {roomId, pause});
  };

  const handleAudioError = (error) => {
    console.error("Audio stream could not be retrieved:", error);
  };

  return (
    <section className="w-full flex-col items-center bottom-0 left-0 right-0 bg-gray-800 text-gray-100 ">
      <div className="bg-gray-600 py-2 bg-opacity-80 flex justify-center text-white rounded-tl-lg rounded-tr-lg ">
        <h2 className="pr-2">
          {track_name} by {artist_name}
        </h2>
      </div>

      <audio
        ref={audioRef}
        src={`${process.env.REACT_APP_API_URL}/api/audio/${encodeURIComponent(
          artist_name
        )}/${encodeURIComponent(track_name)}/${encodeURIComponent(duration)}`}
        onTimeUpdate={handleTimeUpdate}
        onError={(error) => handleAudioError(error)}
        onLoadStart={() => setBuffering(true)}
        onSeeking={() => setBuffering(true)}
        onCanPlay={() => setBuffering(false)}
        onEnded={() => endofSong(0)}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className="m-1 flex justify-center align-middle">
        <SkipButton
          socket={socket}
          seconds={-15}
          audioRef={audioRef}
          buffering={buffering}
          roomId={roomId}
          
        />
        <PlayPauseButton
          paused={paused}
          setPaused={setPaused}
          audioRef={audioRef}
          buffering={buffering}
          roomId={roomId}
          socket={socket}
        />
        <SkipButton
          socket={socket}
          seconds={15}
          audioRef={audioRef}
          buffering={buffering}
          roomId={roomId}
        />
      </div>
      <div className="w-full flex flex-row justify-center">
        <div className="container w-full md:w-2/3">
          <SeekBarSlider
            socket={socket}
            roomId={roomId}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            audioRef={audioRef}
            duration={duration}
          />
        </div>
        <VolumeSlider
            volume={volume}
            setVolume={setVolume}
            audioRef={audioRef}
          />
      </div>
    </section>
  );
};

export default MusicPlayer;
