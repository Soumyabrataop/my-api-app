import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie;

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-xl font-semibold text-red-500">
          No movie found!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center mt-6 pt-6 justify-center sm:gap-16 sm:p-8">
      <div className="flex-1 max-w-full sm:max-w-md text-center sm:text-left">
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition duration-300 ease-in-out"
        >
          ← Back to Movies
        </button>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground dark:text-white">
          {movie.Title}
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {movie.Year} | {movie.Type}
        </p>
        <p className="text-gray-600 mt-4">{movie.Plot}</p>
      </div>

      <div className="flex-shrink-0 sm:max-w-xs w-full">
        <img
          src={
            movie.Poster === "N/A"
              ? "https://via.placeholder.com/500"
              : movie.Poster
          }
          alt={movie.Title}
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default MovieDetail;
