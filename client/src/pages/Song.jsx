import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Logo from "../icons/Logo.svg";
import MusicPlayer from "../components/MusicPlayer";
import Lyrics from "../components/Lyrics";
import Footer from "../components/Footer";

const Song = () => {
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(25);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { uuid } = useParams();
  const track_name = useLocation().state.track_name;
  const artist_name = useLocation().state.artist_name;

  useEffect(() => {
    const fetchLyrics = async () => {
      await fetch(`http://10.0.0.63:3001/api/lyrics/${uuid}`)
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
          setLyrics([]);
        })
        .then((data) => {
          setLyrics(data);
        });
      setIsLoading(false);
    };
    fetchLyrics();
  }, [track_name, artist_name, uuid]);

  function handleTimeUpdate() {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    const currentSecond = audioRef.current.currentTime * 1000;
    if (lyrics.length < 1) return;
    const index = lyrics.findIndex(
      (lyric) =>
        lyric.startTimeMs <= currentSecond && lyric.endTimeMs > currentSecond
    );
    setActiveIndex(index);
  }

  return (
    <div>
      <div class="container mx-auto flex flex-col justify-center items-center px-5 py-36 ">
        <img
          class="lg:w-2/6 md:w-3/6 w-5/6 pb-10 object-center rounded"
          alt="Crescn Logo"
          src={Logo}
        />
        {isLoading ? (
          <div class="text-white flex w-full justify-center bg-gray-800 rounded h-screen">
            <svg
              class="animate-spin max-h-12 sm:max-h-16 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <Lyrics
            audioRef={audioRef}
            lyrics={lyrics}
            activeIndex={activeIndex}
          />
        )}
        <div class="w-full md:w-2/3 flex flex-col items-center text-center">
          <MusicPlayer
            track_name={track_name}
            artist_name={artist_name}
            audioRef={audioRef}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            setDuration={setDuration}
            handleTimeUpdate={handleTimeUpdate}
            volume={volume}
            setVolume={setVolume}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Song;
