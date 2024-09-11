import React from "react";
import SkipForward from "../icons/SkipForward.svg";
import SkipBackward from "../icons/SkipBackward.svg";

const SkipButton = ({ socket, seconds, buffering, audioRef, roomId }) => {
  const skip = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
    var time = audioRef.current.currentTime;
    if (socket.connected) {
      socket.emit("songTime", {roomId, time})
      }
  };
  const buttonStyle = () => {
    return seconds < 0
      ? "hover:opacity-50 hover:-rotate-6"
      : "hover:opacity-50 hover:rotate-6";
  };
  return (
    <button onClick={() => skip(seconds)} disabled={buffering}>
      <img
        alt={seconds < 0 ? "Skip Backward 15 Seconds" : "Skip Forward 15 Seconds"}
        src={seconds < 0 ? SkipBackward : SkipForward}
        className={buffering ? "cursor-not-allowed" : buttonStyle()}
      />
    </button>
  );
};

export default SkipButton;
