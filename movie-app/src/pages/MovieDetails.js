import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieDetails.css"; // we will create this

const API_KEY = "192ae4d1a0f24abb2b6d7296e9fee52f"; // replace with your key

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <h2>Loading movie details...</h2>;

  return (
    <div className="movie-details">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="info">
        <h1>{movie.title}</h1>

        <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
        <p><strong>📅 Release Date:</strong> {movie.release_date}</p>
        <p><strong>⏳ Runtime:</strong> {movie.runtime} min</p>

        <p className="overview"><strong>Overview:</strong> {movie.overview}</p>

        <p><strong>Genres:</strong> 
          {movie.genres.map((g) => g.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
