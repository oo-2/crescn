import React, { useEffect } from "react";
import Play from "../icons/Play.svg";
import Pause from "../icons/Pause.svg";

const PlayPauseButton = ({ roomId, socket, paused, setPaused, buffering, audioRef }) => {
  const playPause = (pause) => {
    if (!audioRef.current) return;
    if (socket.connected) {
      socket.emit("songPaused", {roomId, pause});
    } else {
      console.error("You are not connected to the server.")
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (socket.connected) {
      socket.on("songUpdate", (data) => {
        if (data.updateType === "pauseState") {
          setPaused(data.pause);
          data.pause ? audioRef.current.pause() : audioRef.current.play();
        }
        }
    )
    }
  }, [socket, setPaused, paused, audioRef]);

  return (
    <button
      className="mx-1"
      onClick={() => playPause(paused ? 0 : 1)}
      disabled={buffering}
    >
      <img
        alt={paused ? "Play Button" : "Pause Button"}
        src={paused ? Play : Pause}
        className={
          buffering ? "animate-pulse cursor-not-allowed" : "hover:opacity-50"
        }
      />
    </button>
  );
};

export default PlayPauseButton;
