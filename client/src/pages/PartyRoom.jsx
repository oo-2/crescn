import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { socket } from "../Socket";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import CopyLink from "../components/CopyLinkButton";
import ActiveSong from "../components/ActiveSong";
import AddQueue from "../components/AddQueue";
import Loading from "../components/Loading";

const PartyRoom = () => {
  const { roomId } = useParams();
  const [queue, setQueue] = useState([]);
  const navigate = useNavigate();
  const title = `${process.env.REACT_APP_WEBSITE_NAME}`;
  const description = "Come sing along on Crescn";
  const imageUrl = "https://crescn.app/logo192.png";
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  // const [activeSong, setActiveSong] = useState({
  //   id: null,
  //   artist: null,
  //   track: null,
  // });
  const addToQueueFromResults = (data) => {
    const { _id, artist_name, track_name } = data;
    const song = {
      id: _id,
      artist: artist_name,
      track: track_name,
    };
    socket.emit("queueAdd", {roomId, song});
  };

  const playSong = () => {
    console.log(queue[0].id);
  };
  const removeSong = (index) => {
    socket.emit("queueRemove", {roomId, index});
  };
  useEffect(() => {
    if (socket.connected) {
      setIsLoading(false);
      if (!users.length) socket.emit("roomState", { roomId });
      socket.on("userUpdate", (data) => {
        setUsers(data.usernames);
      });

      socket.on("queueUpdate", (data) => {
        console.log("Queue updated!")
        setQueue(data.queue);
      });

      socket.on("error", (data) => {
        console.error("Error:", data.message);
      });

      return () => {
        socket.off("userUpdate");
        socket.off("queueUpdate");
        socket.off("error");
      };
    } else {
      navigate("/");
    }
  }, [navigate, users.length, roomId]);
  return (
    <section className="container mx-auto p-8">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
      <div className="container flex w-full  justify-center items-center">
        <a
          href="/"
          rel="noreferrer"
          className="flex lg:w-2/6 md:w-3/6 w-5/6  items-center"
        >
          <Logo className="mb-2 hover:opacity-90" />
        </a>
      </div>
      {isLoading ? (
        <div className="flex w-full justify-center items-center bg-gray-800 rounded h-screen">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 pr-8 h-max">
            <div className="bg-gray-100 rounded-md p-5 mb-6 ">
              {queue.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold my-2 mx-4">
                    Currently Playing:
                  </h2>
                  <h6 className="font-light mb-2 mx-4">
                    {" "}
                    {queue[0].track} by {queue[0].artist}{" "}
                  </h6>
                  <ActiveSong
                    uuid={queue[0].id}
                    artist_name={queue[0].artist}
                    track_name={queue[0].track}
                    roomId={roomId}
                  />
                </>
              ) : (
                <>
                  <h2 className="m-4 text-2xl font-bold">
                    No song is currently playing
                  </h2>
                  <p className="m-4 text-lg font-light">
                    Add some songs to the queue!
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 mt-6 lg:mt-0 h-max">
            <div className="bg-gray-100 p-6 rounded-md mb-6">
              <h2 className="text-2xl font-bold mb-2">Users in the room</h2>
              <h4 className="text-sm font-light mb-4">
                Invite Code: <b>{roomId} </b>
                <CopyLink />
              </h4>
              <ul className="overflow-y-auto h-64">
                {users.map((person, index) => (
                  <li key={index} className="mb-2">
                    {person}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-md mb-6">
              <h2 className="text-2xl font-bold mb-4">Song Queue</h2>
              {queue.length > 1 ? (
                <ul className="list-decimal overflow-y-auto h-64">
                  {queue.slice(1).map((song, index) => (
                    <div key={index} className="flex my-1">
                      <div className="flex items-center">
                        <button
                          onClick={() => playSong(song)}
                          className="bg-purple-700 text-white py-1 px-4 rounded-md hover:bg-purple-800"
                        >
                          ▶
                        </button>
                        <button
                          onClick={() => removeSong(song)}
                          className="bg-purple-700 text-white py-1 px-2 rounded-md hover:bg-purple-800 ml-3 mr-3"
                        >
                          🗑️
                        </button>
                        {index + 1}.
                      </div>
                      <div className="marquee ml-1">
                        <p>
                          {" "}
                          {song.artist} - {song.track}
                        </p>
                      </div>
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="text-lg font-light h-64">Song queue is empty</p>
              )}
            </div>
            <AddQueue onClickResult={addToQueueFromResults} />
          </div>
        </div>
      )}
      <Footer />
    </section>
  );
};

export default PartyRoom;
