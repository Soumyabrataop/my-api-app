import React from "react";
import { Link } from "react-router-dom";

const Search = ({ movies }) => {
  return (
    <div className="mt-5 px-5 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
          >
            <img
              alt={movie.Title}
              src={
                movie.Poster === "N/A"
                  ? "https://via.placeholder.com/150"
                  : movie.Poster
              }
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {movie.Title}
            </h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
              <span className="font-semibold">Year:</span> {movie.Year}
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
              <span className="font-semibold">Type:</span> {movie.Type}
            </p>
            <Link
              to={`/movie/${movie.imdbID}`}
              state={{ movie }}
              className="text-blue-500 hover:text-blue-700 mt-4 block"
            >
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-900 dark:text-gray-300">No results found.</p>
      )}
    </div>
  );
};

export default Search;
