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
          `${
            process.env.REACT_APP_API_URL
          }/api/song/search/${encodeURIComponent(query)}`
        )
          .then((res) => res.json())
          .then((data) => setResults(data));
        setError(null);
        setShowResults(true);
      } catch (error) {
        console.log(error);
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
    <div className="w-full md:w-2/3 flex flex-col items-center text-center">
      <form
        onSubmit={searchQuery}
        className="flex w-full justify-center items-end"
      >
        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
          <label for="search" className="leading-7 text-sm text-gray-400">
            {label}
          </label>
          <input
            type="text"
            name="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-800 rounded
          focus:ring-2  focus:ring-purple-700 focus:bg-opacity-50
          hover:ring-1  hover:ring-purple-500 hover:bg-opacity-80
          text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-purple-700 hover:bg-purple-800 py-2 px-6 rounded text-lg"
        >
          Search
        </button>
      </form>
      <p className="sm:text-sm mt-2  text-gray-200">{undertext}</p>
      {error && <p className="text-red-700">{error}</p>}

      {showResults && (
        <div className="w-full focus:ring-2 mt-3 drop-shadow">
          <ul className="divide-y divide-gray-500 bg-gray-800 rounded bg-opacity-40 border-gray-700 ">
            {results.length > 0 ? (
              results.map((result) => (
                <li
                  key={result.track_id}
                  className="hover:bg-purple-900 hover:text-gray-100 rounded text-gray-300 py-1 px-3 leading-7 transition-colors ease-in-out"
                >
                  <Link to={`/song/${result._id}`}>
                    <h3>
                      {result.artist_name} - {result.track_name}
                    </h3>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-base text-gray-100 py-1 px-3">
                No results found
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Search;
