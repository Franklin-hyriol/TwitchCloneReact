import React from "react";
import "./App.css";
import Games from "./components/Games/Games";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopStreams from "./components/TopStreams/TopStreams";
import Live from "./components/Live/Live";
import GameStreams from "./components/GameStreams/GameStreams";
import Resultats from "./components/Resultats/Resultats";
import Erreur from "./components/Erreur/Erreur";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/top-streams" element={<TopStreams />} />
          <Route path="/live/:slug" element={<Live />} />
          <Route path="/game/:slug" element={<GameStreams />} />
          <Route path="/resultats/:slug" element={<Resultats />} />
          <Route path="/resultats/" element={<Erreur />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
