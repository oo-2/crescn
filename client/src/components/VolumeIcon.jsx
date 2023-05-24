import React from "react";
import Muted from "../icons/Muted.svg";
import LowVolume from "../icons/LowVolume.svg";
import MedVolume from "../icons/MedVolume.svg";
import HighVolume from "../icons/HighVolume.svg";

const VolumeIcon = ({ volume }) => {
  switch (true) {
    case 0 >= volume:
      return <img src={Muted} alt="Volume Muted" />;
    case 30 >= volume:
      return <img src={LowVolume} alt="Volume Low" />;
    case 65 >= volume:
      return <img src={MedVolume} alt="Volume Med" />;
    default:
      return <img src={HighVolume} alt="Volume High" />;
  }
};

export default VolumeIcon;
