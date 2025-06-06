import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="border rounded overflow-hidden shadow hover:shadow-lg transition">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
      <div className="p-2">
        <h2 className="font-bold text-lg">{movie.Title}</h2>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
