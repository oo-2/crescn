import React from 'react';
import Logo from '../logo.svg';
import Search from '../components/Search'

const Home = () => {
  return (
      <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="Crescn Logo" src={Logo} />
          <Search label="Find a song" undertext="Sing your heart out"/>
      </div>

  );
}

export default Home;