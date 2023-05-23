import React from "react";

const Loading = () => {
  return (
  
      <div class="loader">
        <div class="loader-inner">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="loader-block"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
  );
};

export default Loading;
