import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import QueryForm from "../components/QueryForm";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const Home = () => {
  const title = `${process.env.REACT_APP_WEBSITE_NAME}`;
  const description = "Sing your heart out";
  const imageUrl = "https://crescn.app/logo192.png";
  let navigate = useNavigate();
  const generateRoom = () => {
    console.log("Unable to generate room");
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
        <div className="container flex w-full  justify-center items-center">
          <a
            href="/"
            rel="noreferrer"
            className="flex lg:w-2/6 md:w-3/6 w-5/6  items-center"
          >
            <Logo className="mb-2 hover:opacity-90" />
          </a>
        </div>
        <div className="w-2/3 flex flex-col items-center text-center">
          <div className="w-2/4 text-left">
            <label className="text-sm text-gray-400 ">Join a room</label>
          </div>
          <QueryForm
            ButtonText="Join"
            InputStyle="w-2/5 bg-slate-800 rounded
          focus:ring-2  focus:ring-purple-700 focus:bg-opacity-50
          hover:ring-1  hover:ring-purple-500 hover:bg-opacity-80
          text-base text-gray-100  transition-colors duration-200 ease-linear"
            
          />
          <p className="sm:text-sm mt-2  text-gray-200">
            To join an existing room, enter the invite code above
          </p>
        </div>
        <div className="container py-3 m-auto flex flex-row justify-center items-center">
          <button
            onClick={() => generateRoom()}
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
