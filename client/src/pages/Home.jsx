import React from "react";
import Logo from "../icons/Logo.svg";
import Search from "../components/Search";

import Footer from "../components/Footer";

const Home = () => {
  return (
    <section className="body-font min-h-screen flex flex-col">
      <div className="container mx-auto flex flex-col py-24 justify-center items-center">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-2 object-cover object-center rounded"
          alt="Crescn Logo"
          src={Logo}
        />
        <Search label="Find a song" undertext="Sing your heart out" />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
