import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

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
  const title = `${error} | ${process.env.REACT_APP_WEBSITE_NAME}`;
  const description = "Something went wrong";
  const imageUrl = "https://crescn.app/logo192.png";
  return (
    <section className="min-h-screen flex flex-col">
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
      </div>
      <Footer />
    </section>
  );
};

export default Error;
