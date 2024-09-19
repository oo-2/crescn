import React, {useEffect} from "react";


function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const SeekBarSlider = ({ socket, currentTime, setCurrentTime, duration, roomId, audioRef }) => {
  useEffect(() => {
    if (!audioRef.current) return;
    if (socket.connected) {
      socket.on("songUpdate", (data) => {
        if (data.updateType === "timeState"){
          setCurrentTime(data.time);
          audioRef.current.currentTime = data.time;
        }
      })
    }
    
  }, [socket, setCurrentTime, audioRef]);
  
  const handleSeek = (event) => {
    
    const time = event.target.value;
    if (socket.connected) {
      socket.emit("songTime", {roomId, time})
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
        className="mx-2 w-3/4 accent-violet-400 hover:accent-violet-700 duration-300 cursor-pointer"
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
