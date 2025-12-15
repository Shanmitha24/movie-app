import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css"; // <-- IMPORTANT: import your CSS file

const API_KEY = "192ae4d1a0f24abb2b6d7296e9fee52f"; // Replace with your TMDB key

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (query.trim() === "") return;

    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }

    setLoading(false);
  };

  return (
    <div className="search-page">
      <h1 className="search-title">Search Movies</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <h3 className="loading">Loading...</h3>}

      {!loading && movies.length === 0 && query !== "" && (
        <p className="no-results">No movies found!</p>
      )}

      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>

            <p className="movie-title">{movie.title}</p>
            <p className="movie-rating">⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
