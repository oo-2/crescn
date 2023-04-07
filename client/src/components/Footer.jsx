import React from 'react';
import Logo from '../logo.svg';

const Footer = () => {
  return (
<footer class="text-gray-400 bg-gray-900 body-font absolute bottom-0 w-full">
  <div class="px-5 py-3  w-full flex sm:flex-row flex-col items-center">
    <img alt="Crescn Logo" src={Logo} class="w-auto" />
    <p class="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-100 sm:py-2 sm:mt-0 mt-4">&copy; 2023</p>
    <span class="inline-flex sm:ml-auto">
      <a href="https://github.com/oo-2" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-gray-100 mt-1" width="36" height="36"><path d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.334-1.755-1.334-1.755-1.088-.745.083-.729.083-.729 1.204.084 1.838 1.236 1.838 1.236 1.07 1.838 2.809 1.305 3.495.998.109-.776.419-1.305.763-1.605-2.665-.302-5.466-1.332-5.466-5.93 0-1.312.465-2.38 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.652.24 2.873.12 3.176.765.84 1.23 1.908 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A11.965 11.965 0 0 0 24 12.3c0-6.63-5.37-12-12-12"/></svg>
      </a>
      <a class="ml-2" href="https://linkedin.com/in/oo2" target="_blank" rel="noreferrer">
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="fill-gray-100"><path d="M20.972 33.553H25v-6.42c0-1.694.32-3.334 2.42-3.334 2.07 0 2.096 1.936 2.096 3.441v6.313h4.034v-7.119c0-3.496-.755-6.183-4.84-6.183-1.963 0-3.279 1.076-3.817 2.096h-.055v-1.774h-3.867v12.98ZM16.423 14.12a2.339 2.339 0 1 0 0 4.68 2.34 2.34 0 0 0 0-4.68Zm-2.02 19.433h4.038v-12.98h-4.038v12.98ZM9.766 40A1.766 1.766 0 0 1 8 38.234V9.766C8 8.791 8.79 8 9.766 8h28.468C39.209 8 40 8.79 40 9.766v28.468c0 .975-.79 1.766-1.766 1.766H9.766Z"/></svg>      </a>
   </span>
  </div>

</footer>

  );
}

export default Footer;