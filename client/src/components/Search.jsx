import React, { useState } from 'react';
import Lyrics from "./Lyrics";

const Search = ({label, undertext}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [lyrics, setLyrics] = useState([]);


  const searchQuery = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      try {
        await fetch(
          `http://localhost:3001/api/lyrics/search/${query}`
        ).then(res => res.json()).then(data => setResults(data));
        setError(null);
        setShowResults(true);
        setSelectedResult(null);
      } catch (error) {
        setError("An error occurred while searching. Please try again later.");
        setResults([]);
        setShowResults(false);
        setSelectedResult(null);
      }
    } else {
      setError("Please provide a search query")
      setResults([]);
      setShowResults(false);
      setSelectedResult(null);
    }
  }

  const handleResultClick = async (e) => {
    await fetch(`https://spotify-lyric-api.herokuapp.com/?trackid=${e.track_id}`)
    .then(res => res.json())    
    .catch(error => {
      console.error('Error:', error);
      setLyrics([])
      setSelectedResult(null);
      setShowResults(true);
    })
    .then(data => {
      
      if (Object.values(data).length > 2)
        setLyrics(Object.values(data)[2])
      else
        setLyrics([])
      setSelectedResult(e);
      setShowResults(false);
    });
    console.log(e.track_id)
  };


  return (
    <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
      <form onSubmit={searchQuery} class="flex w-full justify-center items-end">
        <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
          <label for="search" class="leading-7 text-sm text-gray-400">{label}</label>
          <input type="text" 
          name="search-input" 
          value={query}
          
          onChange={(e) => setQuery(e.target.value)}
          class="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:bg-purple-900 focus:bg-transparent focus:border-purple-700 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button type="submit" class="inline-flex text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded text-lg">Search</button>
      </form>
      <p class="sm:text-sm mt-2  text-gray-200">{undertext}</p>
      {error && <p class="text-red-700">{error}</p>}
      
      {showResults && <div class="w-full focus:ring-2 mt-3 drop-shadow">
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
        </ul>
        </div>
        }
        {selectedResult && (
        <Lyrics 
          track_name={selectedResult.track_name}
          artist_name={selectedResult.artist_name}
          lyrics={lyrics}
        />
      )}
    </div>
  )
}
export default Search;