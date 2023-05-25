import React from "react";
import Logo from "../icons/Logo.svg";
import Footer from "../components/Footer";
import Cat from "../icons/Cat.svg";
const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="container m-auto flex flex-col py-5 justify-center items-center ">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-2 object-cover object-center rounded"
          alt="Crescn Logo"
          src={Logo}
        />
      </div>
      <div className="justify-center flex flex-col sm:flex-row m-auto ">
        <div className="container m-auto text-center sm:text-right ">
          <h1 className="text-5xl font-bold text-white ">404</h1>
          <p className="text-3xl text-white text-opacity-70 font-light pb-3">
            Page not found.
          </p>
          <a href="/">
            <button className="text-white bg-purple-700 hover:bg-purple-800 py-2 px-6 rounded text-lg">
              Home
            </button>
          </a>
        </div>
        <div className="container flex ">
          <img src={Cat} alt="Cat breaking a vase" />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default NotFound;
