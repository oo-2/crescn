import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Cat from "../icons/Cat.svg";

const Error = () => {
  const location = useLocation();
  const { error, message, contact } = location.state || {
    error: "Something went wrong",
    message: "We're not sure what happened but try again later.",
    contact: true,
  };
  return (
    <section className="min-h-screen flex flex-col">
      <title>
        {error} | {process.env.REACT_APP_WEBSITE_NAME}
      </title>
      <div className="container m-auto flex flex-col py-12 justify-center items-center ">
        <Logo />
      </div>
      <div className="justify-center flex flex-col sm:flex-row m-auto ">
        <div className="container m-auto text-center sm:text-right ">
          <h1 className="text-5xl font-bold text-white ">{error}</h1>
          <p className="text-xl text-white text-opacity-70 font-light">
            {message}
          </p>

          {contact ? (
            <p className="text-l text-white text-opacity-70 font-light">
              Let us know at{" "}
              <a
                href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
                className="underline text-blue-300 hover:opacity-75"
              >
                {process.env.REACT_APP_SUPPORT_EMAIL}
              </a>
            </p>
          ) : (
            <></>
          )}

          <a href="/">
            <button className="text-white bg-purple-700 hover:bg-purple-800 py-2 px-6 mt-2 rounded text-lg">
              Back to Home
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
