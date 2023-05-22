import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Song from "./pages/Song";


function App() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song/:artist_name/:track_name/" element={<Song />} />
          <Route path="/song/:uuid" element={<Song />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}
export default App;
