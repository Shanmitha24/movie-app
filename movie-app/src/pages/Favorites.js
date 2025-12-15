import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../services/backend";
import "./Favorites.css";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
  try {
    const res = await getFavorites();

    // ✅ ensure movies is always an array
    setMovies(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.log("Error loading favorites:", err);
    setMovies([]);
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id);
      loadFavorites(); // refresh list
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  if (movies.length === 0)
    return <h2 className="empty">No favorites added yet ❤️</h2>;

  return (
    <div className="favorites-page">
      <h2 className="title">❤️ Your Favorite Movies</h2>

      <div className="favorites-grid">
        {movies.map((movie) => (
          <div className="favorite-card" key={movie._id}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <button
              className="remove-btn"
              onClick={() => handleDelete(movie._id)}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
