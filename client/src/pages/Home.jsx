import React from "react";
import Search from "../components/Search";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <section className="body-font min-h-screen flex flex-col">
      <title>{process.env.REACT_APP_WEBSITE_NAME}</title>
      <div className="container mx-auto flex flex-col py-24 justify-center items-center">
        <Logo />
        <Search label="Find a song" undertext="Sing your heart out" />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
