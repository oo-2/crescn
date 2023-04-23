import React from "react";

const Lyrics = ({ track_name, artist_name, lyrics }) => {
  

  return (
    <div class="text-white w-full divide-y divide-gray-500 focus:ring-2 mt-3 drop-shadow">
      <h2 class="pt-2 pb-2 bg-gray-700 rounded bg-opacity-80">{track_name} by {artist_name}</h2>
      <ul class=" bg-gray-800 rounded bg-opacity-40 border-gray-700 ">
        {lyrics.length > 0 ? (lyrics.map((lyrics) => (
            <li class="hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-1 px-3 leading-7 transition-colors ease-in-out">
            <h3>{lyrics.words}</h3>
            </li>
        ))
        ) : ( <p class="text-base text-gray-100 py-1 px-3" > No lyrics found</p>)
        }
        </ul>
    </div>
  );
};

export default Lyrics;