import React, { useState } from 'react';
import Lyrics from "./Lyrics";


function SearchResults({ results }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const [lyrics, setLyrics] = useState([]);

  const handleResultClick = async (e) => {
    await fetch(`https://spotify-lyric-api.herokuapp.com/?trackid=${e.track_id}`)
    .then(res => res.json())
    .then(data => {
      setLyrics(Object.values(data)[2])
      setSelectedResult(e);
    })
    .catch(error => {
      console.error('Error:', error);
      setSelectedResult(null);
    });
    console.log(e.track_id)
  };
  

  return (
    <div class="w-full focus:ring-2 mt-3 divide-y divide-gray-500">
        <ul class="divide-y divide-gray-500 bg-gray-800 rounded bg-opacity-40 border-gray-700 ">
        
        {results.length > 0 ? (results.map((result) => (
            <li key={result.track_id} 
            onClick={() => handleResultClick(result)}
            class="hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-1 px-3 leading-7 transition-colors ease-in-out">
            <h3>{result.artist_name} - {result.track_name}</h3>
            </li>
        ))
        ) : ( <p class="text-base text-gray-100 py-1 px-3" >No results found</p>)
      }
{selectedResult && (
        <Lyrics 
          track_name={selectedResult.track_name}
          artist_name={selectedResult.artist_name}
          lyrics={lyrics}
        />
      )}
        </ul>
    </div>
  );
}

export default SearchResults;