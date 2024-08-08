import React, {useEffect} from "react";
import { socket } from "../Socket"

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const SeekBarSlider = ({ currentTime, setCurrentTime, duration, roomId, audioRef }) => {
  useEffect(() => {
    if (!audioRef.current) return;
    if (socket.connected) {
      socket.on("songUpdate", (data) => {
        if (data.type === 0 || data.type === 3){
          setCurrentTime(data.time);
          audioRef.current.currentTime = data.time;
        }
      })
    }
    
  }, [setCurrentTime, audioRef]);
  
  const handleSeek = (event) => {
    
    const time = event.target.value;
    if (socket.connected) {
      socket.emit("songTime", {roomId, time})
      setCurrentTime(time);
      audioRef.current.currentTime = time;
    }
  };
  return (
    <>
      <label htmlFor="slider" className="text-sm">
        {formatTime(currentTime)}
      </label>
      <input
        type="range"
        id="slider"
        className="mx-2 w-1/3 accent-violet-400 hover:accent-violet-700 duration-300 cursor-pointer"
        min="0"
        max={audioRef.current ? audioRef.current.duration : "0"}
        value={currentTime}
        onChange={handleSeek}
      />
      <label htmlFor="slider" className="text-sm">
        {formatTime(duration)}
      </label>
    </>
  );
};

export default SeekBarSlider;
