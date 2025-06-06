import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "ac2e9eec";

function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline">← Back to search</Link>
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-72 h-auto object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
