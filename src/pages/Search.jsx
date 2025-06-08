import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { FaSpinner } from "react-icons/fa";
import { clearMovies, searchMovies } from "../app/features/movies/movieSlice";

function Search() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [btn, setBtn] = useState(0);
  const inputRef=useRef(null);

  const dispatch = useDispatch();
  const { loading, error, movies,query: currentQuery } = useSelector((state) => state.movies);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle API call when query or page changes
  useEffect(() => {

    if (!query.trim()) return;

    const delay = setTimeout(() => {
      dispatch(searchMovies({ query, page }));
    }, 400);

    return () => clearTimeout(delay);
  }, [query, page, dispatch]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1);
    dispatch(clearMovies());
  };

  const handleLoadMore = () => {
    if (!query.trim()) 
      setQuery(currentQuery); // Reset to previous query if empty
    setPage((prev) => prev + 1);
    setBtn(page + 1);
  };

  const handlePageClick = (pgNum) => {
    setPage(pgNum); // This triggers API call via useEffect
  };
  useEffect(() => {
    if (movies && movies.length == 0) {
      setBtn(0); // Assuming 10 results per page
    }
  }, [error]);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen flex flex-col">
      {movies && movies.length > 0 && (
        <h1 className="text-2xl font-bold mb-4">
          Search Results for: <span className="text-blue-600">{currentQuery}</span>
        </h1>
      )}
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-6">
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a movie..."
          className="border p-2 w-full rounded"
          value={query}
          onChange={handleInputChange}
        />
      </form>

      {loading && (
        <div className="flex justify-center items-center my-4">
          <FaSpinner className="animate-spin text-2xl text-blue-500" />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies && movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {movies && movies.length > 0 && (
        <div className="flex flex-col items-center mt-6 gap-4">
          {/* Page 1: Only Show Load More */}
          {page ==0 && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Load More"}
            </button>
          )}

          {/* Page >= 2: Show Pagination + Load More */}
          {page >= 1 && (
            <>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: btn }, (_, i) => i + 1).map((pgNum) => (
                  <button
                    key={pgNum}
                    onClick={() => handlePageClick(pgNum)}
                    className={`px-3 py-1 rounded border ${
                      pgNum === page
                        ? "bg-green-600 text-white"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    {pgNum}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Load More"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
