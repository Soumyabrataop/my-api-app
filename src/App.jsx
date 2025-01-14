import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Search from "./Search";
import MovieDetail from "./MovieDetail";
import Toggle from "./Toggle";
import "./global.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [finalSearchTerm, setFinalSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const updateSearchTerm = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    setFinalSearchTerm(searchTerm);
  };

  const e = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!finalSearchTerm) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${e}&s=${finalSearchTerm}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [finalSearchTerm]);

  if (loading)
    return <p className="text-gray-900 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-600 dark:text-red-400">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* Show Toggle button on every page */}
      <Toggle />

      {/* Conditionally render header and search bar */}
      {location.pathname && !location.pathname.startsWith("/movie/") && (
        <>
          <div className="mt-20">
            <a href="/">
              <h1 className="mt-5 text-center mx-auto mb-4 max-w-3xl text-4xl/[1.1] font-extrabold tracking-tight text-foreground dark:text-white md:text-5xl/[1.1]">
                MovieLand
              </h1>
            </a>
          </div>

          <div className="mt-8 text-center mx-auto max-w-3xl">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:text-white dark:bg-black w-full max-w-md p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md dark:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            <button
              type="button"
              onClick={updateSearchTerm}
              className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Search movies={movies} />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default App;
