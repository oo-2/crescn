import React from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Cat from "../icons/Cat.svg";

const Error = ({ errorNumber, errorMessage }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <title>{errorNumber} | {process.env.REACT_APP_WEBSITE_NAME}</title>
      <div className="container m-auto flex flex-col py-12 justify-center items-center ">
        <Logo />
      </div>
      <div className="justify-center flex flex-col sm:flex-row m-auto ">
        <div className="container m-auto text-center sm:text-right ">
          <h1 className="text-5xl font-bold text-white ">{errorNumber}</h1>
          <p className="text-3xl text-white text-opacity-70 font-light pb-3">
            {errorMessage}
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

export default Error;
