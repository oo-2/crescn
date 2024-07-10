import React, { useState } from "react";

import { ReactComponent as Clipboard } from "../icons/Clipboard.svg";
import { ReactComponent as ClipboardCheck } from "../icons/ClipboardCheck.svg";

const CopyLink = ({fillColor}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).catch((error) => {
      console.error("Failed to copy URL to clipboard:", error);
      alert("Could not copy to clipboard.");
      return;
    });
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };
  return (
    <button onClick={handleShareClick} disabled={isClicked}>
      {isClicked ? (
        <ClipboardCheck
          fill={fillColor}
          alt="Link Copied"
          className="cursor-default"
        />
      ) : (
        <Clipboard
          alt="Copy Link"
          fill={fillColor}
          className="cursor-pointer hover:opacity-50 "
        />
      )}
    </button>
  );
};

export default CopyLink;
