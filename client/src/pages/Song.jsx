import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import MusicPlayer from "../components/MusicPlayer";
import Lyrics from "../components/Lyrics";
import Footer from "../components/Footer";
import Loading from "../components/Loading";



const Song = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { uuid } = useParams();
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

  useEffect(() => {
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
            navigate("/404");
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
      <title>{process.env.REACT_APP_WEBSITE_NAME}</title>
      {fetchedAPI ? (
        <div className="container mx-auto flex flex-col justify-center items-center pt-5 pb-36">
          <title> {track_name} by {artist_name} | Crescn</title>
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
        <></>
      )}
    </div>
  );  
};

export default Song;
