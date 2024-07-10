import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isIE, isSafari, isMobileSafari } from "react-device-detect";

import MusicPlayer from "./MusicPlayer";
import Lyrics from "./Lyrics";
import Loading from "./Loading";
import Footer from "./Footer";

const ActiveSong = ({uuid, artist_name, track_name}) => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(25);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [track_id, setTrackID] = useState(null);


  useEffect(() => {
    if (isIE || isMobileSafari || isSafari) {
      navigate("/error", {
        state: {
          error: "Browser Not Supported",
          message:
            "Sorry, certain browsers are not supported such as IE, Safari, and Apple's WebKit.",
        },
      });
    }
    const fetchSong = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/api/song/${uuid}`)
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
        })
        .then((data) => {
          if (data && !data.error) {
            setDuration(data.duration / 1000);
            if (!data.lyrics.length) {
              setTrackID(data.track_id);
            } else {
              setLyrics(data.lyrics);
              setIsLoading(false);
            }
          } else {
            navigate("/error", {
              state: {
                error: "Song not found",
                message: "Sorry about that, choose a different one.",
              },
            });
          }
        });
      if (track_id)
        await fetch(`${process.env.REACT_APP_API_URL}/api/lyrics/${track_id}`)
          .then((res) => res.json())
          .catch((error) => {
            console.error("Error:", error);
          })
          .then((data) => {
            if (data) setLyrics(data);
            setIsLoading(false);
          });
    };
    fetchSong();
  }, [navigate, track_id, uuid]);

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
    <>
          {isLoading ? (
            <div className="flex w-full justify-center items-center bg-gray-800 rounded">
              <Loading />
            </div>
          ) : (
            <>
              <Lyrics
                audioRef={audioRef}
                lyrics={lyrics}
                activeIndex={activeIndex}
              />
              <div className="flex flex-col items-center text-center">
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

        </>
  );
};

export default ActiveSong;
