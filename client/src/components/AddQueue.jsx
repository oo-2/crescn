import React, { useState } from "react";
import QueryForm from "./QueryForm";

const AddQueue = ({ onClickResult }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const searchQuery = async (query) => {
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
    <div className="bg-gray-100 p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add to Queue</h2>
      <QueryForm
        ButtonText="Search"
        InputStyle="w-full bg-white rounded-md"
        InputPlaceholder={"Search for a song"}
        query={query}
        setQuery={setQuery}
        submitFunc={searchQuery}
      />
      {error && <p className="text-red-700">{error}</p>}

      {showResults && (
        <div className="md:w-full w-3/4 mt-3 overflow-y-auto h-64">
          <ul className="divide-y divide-slate-400">
            {results.length > 0 ? (
              results.map((result) => (
                <li
                  key={result.track_id}
                  className="py-2 px-3 transition-colors ease-linear hover:text-gray-600 cursor-pointer"
                  onClick={() => onClickResult(result)}
                >
                  <h3>
                    {result.artist_name} - {result.track_name}
                  </h3>
                </li>
              ))
            ) : (
              <p className="text-base py-1 px-3">
                No results found
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default AddQueue;
