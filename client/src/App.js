import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import PartyRoom from "./pages/PartyRoom";
import ActiveSong from "./components/ActiveSong";
import Terms from "./pages/Terms";
import Error from "./pages/Error";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/party/:inviteCode" element={<PartyRoom />} />
        <Route exact path="/song/:uuid" element={<ActiveSong />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route
          path="/404"
          element={
            <Navigate
              to="/error"
              state={{
                error: 404,
                message: "Page not found.",
              }}
            />
          }
        />
        <Route path="/error" element={<Error />} />
        
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
