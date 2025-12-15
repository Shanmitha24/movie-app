import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import { addFavorite } from "../services/backend";   // ⭐ IMPORT THIS
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await fetchTrending();
      setMovies(data);
    } catch (error) {
      console.log("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // ⭐ ADD THIS FUNCTION
  const handleAddFavorite = async (movie) => {
    try {
    await addFavorite({
  movieId: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
});

      alert(`${movie.title} added to favorites ❤️`);
    } catch (error) {
      console.log("Error adding favorite:", error);
      alert("Failed to add favorite");
    }
  };

  if (loading) return <h2 className="loading">Loading Movies...</h2>;

  return (
    <div className="home-page">
      <h2 className="title">🔥 Trending Movies</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            {/* ⭐ NEW FAVORITE BUTTON */}
            <button
         className="favorite-btn"
         onClick={() => handleAddFavorite(movie)}
         title="Add to favorites"
>
         ❤️
         </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
