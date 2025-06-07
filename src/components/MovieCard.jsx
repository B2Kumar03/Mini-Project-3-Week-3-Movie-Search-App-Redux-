// components/MovieCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function MovieCard({ movie }) {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  return (
    <div className="border rounded overflow-hidden shadow hover:shadow-lg transition relative">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !="N/A" ? movie.Poster : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-bold text-lg">{movie.Title}</h2>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </div>
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-red-500 text-xl"
      >
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
}

export default MovieCard;
