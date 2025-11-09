import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const removeFavorite = (movieId: number) => {
    const updated = favorites.filter((m) => m.id !== movieId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>我的收藏電影</h2>
      {favorites.length === 0 ? (
        <p>尚未收藏任何電影。</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {favorites.map((m) => (
            <div
              key={m.id}
              style={{
                position: "relative",
                paddingTop: "150%",
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w185${m.poster_path}`
                    : "/assets/img/no-image.png"
                }
                alt={m.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <button
                onClick={() => removeFavorite(m.id)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "red",
                  cursor: "pointer",
                }}
                title="移除收藏"
              >
                <FaTrash />
              </button>

              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  textAlign: "center",
                  padding: "0.25rem",
                  fontSize: "0.8rem",
                  color: "#fff",
                  background: "rgba(0,0,0,0.5)",
                }}
              >
                {m.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
