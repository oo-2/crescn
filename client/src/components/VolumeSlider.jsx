import React from "react";
import VolumeIcon from "./VolumeIcon";

const VolumeSlider = ({ volume, setVolume, audioRef }) => {
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
  return (
    <>
      <button onClick={muteAudio} className="hover:opacity-50">
        <VolumeIcon volume={volume} />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="mx-2 md:w-1/3 w-3/5 accent-violet-400 hover:accent-violet-700 duration-300 cursor-pointer"
      />
    </>
  );
};

export default VolumeSlider;
