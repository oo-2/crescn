import React from "react";

const Search = ({ InputStyle, InputPlaceholder, ButtonText, submitFunc, query, setQuery   }) => {

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitFunc(query);
        }}
        className="flex w-full justify-center items-end"
      >

          <input
            type="text"
            name="text-input"
            placeholder={InputPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={InputStyle}
          />
        <button
          type="submit"
          className="text-white bg-purple-700 hover:bg-purple-800 py-2 px-6 rounded text-lg mx-2"
        >
          {ButtonText}
        </button>
      </form>
    </>
  );
};

export default Search;
