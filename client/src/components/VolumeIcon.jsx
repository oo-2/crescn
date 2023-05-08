import React from "react";
import Muted from "../icons/Muted.svg";
import LowVolume from "../icons/LowVolume.svg";
import HighVolume from "../icons/HighVolume.svg";

const VolumeIcon = ({ volume }) => {
    switch (true) {
        case volume === 0:
          return <img src={Muted} alt="Volume Muted" />;
        case 30 >= volume:
          return <img src={LowVolume} alt="Volume Low" />;
        default:
          return <img src={HighVolume} alt="Volume High" />;
      }
};

export default VolumeIcon;