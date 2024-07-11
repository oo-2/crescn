import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { socket } from '../Socket';
import { useNavigate } from "react-router-dom";

import QueryForm from "../components/QueryForm";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const Home = () => {
  const title = `${process.env.REACT_APP_WEBSITE_NAME}`;
    const description = "Sing your heart out";
    const imageUrl = "https://crescn.app/logo192.png";
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState("");

    useEffect(() => {
        if (socket) {
            socket.on('roomCreated', (data) => {
                navigate(`/party/${data.roomId}`);
            });

            socket.on('userJoined', (roomId) => {
                console.log("hey")
                navigate(`/party/${roomId}`);
            });

            socket.on('error', (error) => {
                console.error('Error:', error);
            });

            return () => {
                socket.off('roomCreated');
                socket.off('userJoined');
                socket.off('error');
            };
        }
    }, [socket, navigate]);

    const handleJoinRoom = (roomCode) => {
        if (roomCode && username) {
            socket.connect()
            socket.emit('joinRoom', { roomId: roomCode, username });
        }
    };

    const generateRoom = () => {
      
        if (username) {
            socket.connect()
            const newRoomCode = 'room-' + Math.random().toString(36).substr(2, 9); // Or generate room code on the server
            socket.emit('createRoom', { roomId: newRoomCode, username });
        } else {
            console.log("Unable to generate room without username");
        }
    };

    return (
        <section className="body-font min-h-screen flex flex-col">
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

            <div className="container mx-auto flex flex-col py-24 justify-center items-center">
                <div className="container flex w-full justify-center items-center">
                    <a href="/" rel="noreferrer" className="flex lg:w-2/6 md:w-3/6 w-5/6 items-center">
                        <Logo className="mb-2 hover:opacity-90" />
                    </a>
                </div>

                <div className="w-2/3 flex flex-col items-center text-center">
                    <div className="w-2/4 text-left">
                        <label className="text-sm text-gray-400">Sing your heart out</label>
                    </div>
                    <input
                        type="text"
                        name="text-input"
                        placeholder={"Enter Username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-1/2 bg-slate-800 rounded focus:ring-2 focus:ring-purple-700 focus:bg-opacity-50 hover:ring-1 hover:ring-purple-500 hover:bg-opacity-80 text-base text-gray-100 transition-colors duration-200 ease-linear"
                    />
                    <QueryForm
                        ButtonText="Join"
                        InputPlaceholder="Enter Room Code"
                        InputStyle="w-2/5 bg-slate-800 rounded focus:ring-2 focus:ring-purple-700 focus:bg-opacity-50 hover:ring-1 hover:ring-purple-500 hover:bg-opacity-80 text-base text-gray-100 transition-colors duration-200 ease-linear"
                        submitFunc={handleJoinRoom}
                        onInputChange={(e) => setRoomCode(e.target.value)}
                    />
                </div>
                <div className="container py-3 m-auto flex flex-row justify-center items-center">
                    <button
                        onClick={generateRoom}
                        className="text-white bg-purple-700 hover:bg-purple-800 py-2 px-6 rounded text-lg"
                    >
                        Create Room
                    </button>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Home;
