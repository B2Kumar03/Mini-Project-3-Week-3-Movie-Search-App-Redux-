import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <nav className="bg-black text-white p-4 text-lg">
        <Link to="/" className="font-bold">🎬 Movie Search App</Link>
      </nav>
      <Routes >
        <Route path="/" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
