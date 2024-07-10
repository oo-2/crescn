import React from "react";
import {ReactComponent as LogoSVG} from "../icons/Logo.svg";

const Logo = ({ className }) => {
  return (
    <LogoSVG
      className={className}
      alt={`${process.env.REACT_APP_WEBSITE_NAME} Logo`}
      src={LogoSVG}
    />
  );
};

export default Logo;
