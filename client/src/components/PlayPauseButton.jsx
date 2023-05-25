import React, { useEffect, useCallback } from "react";
import Play from "../icons/Play.svg";
import Pause from "../icons/Pause.svg";

const PlayPauseButton = ({ paused, setPaused, buffering, audioRef }) => {
  const play = useCallback(() => {
    if (!audioRef.current) return;
    setPaused(false);
    audioRef.current.play();
  }, [setPaused, audioRef]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    setPaused(true);
    audioRef.current.pause();
  }, [setPaused, audioRef]);

  useEffect(() => {
    console.log(paused);
    const handleKeydown = (event) => {
      event.preventDefault();
      if (!buffering && event.code === "Space") {
        if (paused) {
          play();
        } else {
          pause();
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [buffering, paused, pause, play]);

  return (
    <button
      className="mx-1"
      onClick={paused ? play : pause}
      disabled={buffering}
    >
      <img
        alt={paused ? "Play Button" : "Pause Button"}
        src={paused ? Play : Pause}
        className={buffering ? "animate-pulse cursor-not-allowed" : "hover:opacity-50"}
      />
    </button>
  );
};

export default PlayPauseButton;
