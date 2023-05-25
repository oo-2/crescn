import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Song from "./pages/Song";
import Terms from "./pages/Terms"
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/song/:uuid" element={<Song />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
