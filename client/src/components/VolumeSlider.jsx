import React, { useState, useEffect, useRef } from "react";
import VolumeIcon from "./VolumeIcon";

const VolumeSlider = ({ volume, setVolume, audioRef }) => {
  const [showPopover, setShowPopover] = useState(false);
  const hoverTimeout = useRef(null);

  const handleVolumeChange = (event) => {
    if (!audioRef.current) return;
    if (localStorage.getItem("premute")) localStorage.removeItem("premute");
    setVolume(event.target.value);
    localStorage.setItem("volume", event.target.value);
    audioRef.current.volume = event.target.value / 100;
  };

  const muteAudio = () => {
    if (!audioRef.current) return;
    if (localStorage.getItem("premute")) {
      audioRef.current.volume =
        parseFloat(localStorage.getItem("premute")) / 100;
      setVolume(parseFloat(localStorage.getItem("premute")));
      localStorage.setItem("volume", audioRef.current.volume * 100);
      localStorage.removeItem("premute");
    } else {
      localStorage.setItem("premute", audioRef.current.volume * 100);
      setVolume(0);
      localStorage.setItem("volume", 0);
      audioRef.current.volume = 0;
    }
  };

  // Show the popover when the user enters the button/popover area
  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setShowPopover(true);
  };

  // Hide the popover with a small delay when the user leaves
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowPopover(false);
    }, 200); // Delay to make it more forgiving
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="hover:opacity-50" onClick={muteAudio}>
        <VolumeIcon volume={volume} />
      </button>

      {showPopover && (
        <div
          className="p-2 absolute bottom-full bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg "
        >
          <input
            type="range"
            min="0"
            max="100"
            orient="vertical"
            value={volume}
            onChange={handleVolumeChange}
            className=" accent-violet-400  hover:accent-violet-700 duration-300 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default VolumeSlider;
