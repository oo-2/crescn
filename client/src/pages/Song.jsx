import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { isIE, isSafari, isMobileSafari } from "react-device-detect";
import { Helmet } from "react-helmet";

import Logo from "../components/Logo";
import MusicPlayer from "../components/MusicPlayer";
import Lyrics from "../components/Lyrics";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Song = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { uuid } = useParams();
  const location = useLocation();
  const { artistState, trackState } = location.state || {
    artistState: "",
    trackState: "",
  };
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(25);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedAPI, setFetchedAPI] = useState(false);
  const [track_name, setTrack] = useState("");
  const [artist_name, setArtist] = useState("");
  const [track_id, setTrackID] = useState(null);
  const title = `${process.env.REACT_APP_WEBSITE_NAME}`;
  const description = "Come sing along on Crescn";
  const imageUrl = "https://crescn.app/logo192.png";

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
            setArtist(data.artist_name);
            setTrack(data.track_name);
            setDuration(data.duration / 1000);
            if (!data.lyrics.length) {
              setTrackID(data.track_id);
            } else {
              setLyrics(data.lyrics);
              setIsLoading(false);
            }
            setFetchedAPI(true);
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
    <div>
      <Helmet>
        <title>
          {trackState} - {artistState} | {title}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      {fetchedAPI ? (
        <div className="container mx-auto flex flex-col justify-center items-center pt-5 pb-36">
          <title>
            {" "}
            {track_name} - {artist_name} | {process.env.REACT_APP_WEBSITE_NAME}
          </title>
          <Logo />
          {isLoading ? (
            <div className="flex w-full justify-center items-center bg-gray-800 rounded h-screen">
              <Loading />
            </div>
          ) : (
            <>
              <Lyrics
                audioRef={audioRef}
                lyrics={lyrics}
                activeIndex={activeIndex}
              />
              <div className="w-full md:w-2/3 flex flex-col items-center text-center">
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
      ) : (
        <title>
          {trackState} - {artistState} | {title}
        </title>
      )}
    </div>
  );
};

export default Song;
