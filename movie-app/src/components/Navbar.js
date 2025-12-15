import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2 className="logo">🎬 MovieApp</h2>

      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/search">Search</Link>

        {!isLoggedIn ? (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/favorites" className="nav-icon" title="Favorites">
              ❤️
            </Link>
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
