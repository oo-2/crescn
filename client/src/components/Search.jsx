import React from 'react';

const Search = ({label, undertext}) => {
  return (
    <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
      <div class="flex w-full justify-center items-end">
        <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
          <label for="search" class="leading-7 text-sm text-gray-400">{label}</label>
          <input type="text" name="search-input" class="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:bg-purple-900 focus:bg-transparent focus:border-purple-700 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button type="submit" class="inline-flex text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded text-lg">Search</button>
      </div>
      <p class="sm:text-sm mt-2  text-gray-200">{undertext}</p>
    </div>
  )
}
export default Search;