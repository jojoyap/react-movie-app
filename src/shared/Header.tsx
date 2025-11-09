import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      navigate(`/`);
    } else {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="header"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        backgroundColor: scrolled ? "rgba(20, 20, 20, 0.7)" : "#222",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <nav
        className="nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              onClick={() => setQuery("")}
              style={{ height: "40px" }}
            />
          </Link>
        </div>

        <form
          className="search"
          onSubmit={(e) => e.preventDefault()}
          style={{ flex: 1, margin: "0 1rem" }}
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </form>

        <div className="favorites">
          <Link
            to="/favorites"
            className="fav-btn"
            style={{
              // textDecoration: "none",
              color: "white",
            }}
          >
            <FaHeart />
          </Link>
        </div>
      </nav>
    </header>
  );
}
