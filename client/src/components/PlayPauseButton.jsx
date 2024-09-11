import React, { useEffect, useCallback } from "react";
import Play from "../icons/Play.svg";
import Pause from "../icons/Pause.svg";

const PlayPauseButton = ({ roomId, socket, paused, setPaused, buffering, audioRef }) => {
  const play = useCallback(() => {
    if (!audioRef.current) return;
    setPaused(0);
    audioRef.current.play();
    if (socket.connected) {
      const pause = 0;
      socket.emit("songPaused", {roomId, pause});
    }
  }, [socket, setPaused, audioRef, roomId]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    setPaused(1);
    audioRef.current.pause();
    if (socket.connected) {
      const pause = 1;
      socket.emit("songPaused", {roomId, pause});
    }
  }, [socket, setPaused, audioRef, roomId]);

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
    console.log(paused);
  }, [socket, setPaused, paused, audioRef]);

  return (
    <button
      className="mx-1"
      onClick={paused ? play : pause}
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
