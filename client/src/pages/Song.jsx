import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Logo from "../icons/Logo.svg";
import MusicPlayer from "../components/MusicPlayer";
import Lyrics from "../components/Lyrics";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Song = () => {
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(25);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [track_name, setTrack] = useState("");
  const [artist_name, setArtist] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      var track_id = null;

      await fetch(`http://localhost:3001/api/song/${uuid}`)
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
        })
        .then((data) => {
          if (data && !data.error) {
            setArtist(data.artist_name);
            setTrack(data.track_name);
            setDuration(data.duration / 1000);
            if (!data.lyrics.length) {
              track_id = data.track_id;
            } else {
              setLyrics(data.lyrics);
            }
          } else {
            navigate("localhost:3000/404");
          }
        });

      if (track_id)
        await fetch(`http://localhost:3001/api/lyrics/${track_id}`)
          .then((res) => res.json())
          .catch((error) => {
            console.error("Error:", error);
            setLyrics([]);
          })
          .then((data) => {
            if (data) setLyrics(data);
            else setLyrics([]);
          });
      setIsLoading(false);
    };
    fetchSong();
  }, [navigate, uuid]);

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
          <div class="flex w-full justify-center items-center bg-gray-800 rounded h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <Lyrics
              audioRef={audioRef}
              lyrics={lyrics}
              activeIndex={activeIndex}
            />
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
          </>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Song;
