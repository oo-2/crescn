import React from "react";
import { Helmet } from "react-helmet";

import Search from "../components/Search";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const Home = () => {
  const title = `${process.env.REACT_APP_WEBSITE_NAME}`;
  const description = "Sing your heart out";
  const imageUrl = "https://crescn.app/logo192.png";
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
        <Logo />
        <Search label="Find a song" undertext={description} />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
