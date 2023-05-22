import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ label, undertext }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const searchQuery = async (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      try {
        await fetch(
          `http://10.0.0.63:3001/api/song/search/${encodeURIComponent(query)}`
        )
          .then((res) => res.json())
          .then((data) => setResults(data));
        setError(null);
        setShowResults(true);
      } catch (error) {
        setError("An error occurred while searching. Please try again later.");
        setResults([]);
        setShowResults(false);
      }
    } else {
      setError("Please provide a search query");
      setResults([]);
      setShowResults(false);
    }
  };

  return (
    <div class="w-full md:w-2/3 flex flex-col items-center text-center">
      <form onSubmit={searchQuery} class="flex w-full justify-center items-end">
        <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
          <label for="search" class="leading-7 text-sm text-gray-400">
            {label}
          </label>
          <input
            type="text"
            name="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            class="w-full bg-slate-800 rounded border
          focus:ring-2  focus:border-purple-700 focus:bg-opacity-50
          hover:ring-1  hover:border-purple-500 hover:bg-opacity-80
          text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          class="inline-flex text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded text-lg"
        >
          Search
        </button>
      </form>
      <p class="sm:text-sm mt-2  text-gray-200">{undertext}</p>
      {error && <p class="text-red-700">{error}</p>}

      {showResults && (
        <div class="w-full focus:ring-2 mt-3 drop-shadow">
          <ul class="divide-y divide-gray-500 bg-gray-800 rounded bg-opacity-40 border-gray-700 ">
            {results.length > 0 ? (
              results.map((result) => (
                <li
                  key={result.track_id}
                  class="hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-1 px-3 leading-7 transition-colors ease-in-out"
                >
                  <Link
                    to={`/song/${result._id}`}
                    state={{
                      track_name: result.track_name,
                      artist_name: result.artist_name,
                    }}
                  >
                    <h3>
                      {result.artist_name} - {result.track_name}
                    </h3>
                  </Link>
                </li>
              ))
            ) : (
              <p class="text-base text-gray-100 py-1 px-3">No results found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Search;
