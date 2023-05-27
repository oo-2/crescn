import React, { useState } from "react";

import Clipboard from "../icons/Clipboard.svg";
import ClipboardCheck from "../icons/ClipboardCheck.svg";

const CopyLink = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).catch((error) => {
      console.error("Failed to copy URL to clipboard:", error);
      alert("Could not copy to clipboard.")
      return;
    });
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <button onClick={handleShareClick} disabled={isClicked}>
      {isClicked ? (
        <img
          alt="Link Copied"
          src={ClipboardCheck}
          className="cursor-default"
        />
      ) : (
        <img
          alt="Copy Link"
          src={Clipboard}
          className="cursor-pointer hover:opacity-50 "
        />
      )}
    </button>
  );
};

export default CopyLink;
