import React from "react";
import Logo from "../icons/Logo.svg";
import Github from "../icons/GitHub.svg";
import Linkedin from "../icons/Linkedin.svg";

const Footer = () => {
  return (
    <footer className="text-gray-400 body-font mt-auto w-full flex-shrink">
      <div className="px-5 py-3 w-full flex sm:flex-row flex-col items-center">
        <a href="/" rel="noreferrer">
          <img alt="Crescn Logo" src={Logo} />
        </a>
        <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-100 sm:py-2">
          &copy; 2023
        </p>
        <span className="inline-flex sm:ml-auto">
          <a href="https://github.com/oo-2" target="_blank" rel="noreferrer">
          <img alt="Github Profile" className="mt-1" src={Github} />
          </a>
          <a
            className="ml-2"
            href="https://linkedin.com/in/oo2"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="Linkedin Profile" src={Linkedin} />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
