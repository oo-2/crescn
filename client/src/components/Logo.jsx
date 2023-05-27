import React from "react";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../icons/Logo.svg";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      className="lg:w-2/6 md:w-3/6 w-5/6 mb-2 hover:cursor-pointer"
      alt={`${process.env.REACT_APP_WEBSITE_NAME} Logo`}
      src={LogoSVG}
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
