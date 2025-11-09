import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface MovieModalProps {
  movieId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string | null;
  credits: {
    cast: { name: string; character: string }[];
    crew: { job: string; name: string }[];
  };
  videos: { results: { key: string; site: string; type: string }[] };
  reviews: { results: { author: string; content: string }[] };
}

export default function MovieModal({
  movieId,
  isOpen,
  onClose,
}: MovieModalProps) {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

  useEffect(() => {
    if (!isOpen || !movieId) return;

    async function fetchMovieDetail() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=zh-TW&append_to_response=credits,videos,reviews`
      );
      const data = await res.json();
      setMovieDetail(data);
    }

    fetchMovieDetail();
  }, [movieId, isOpen]);

  if (!isOpen || !movieDetail) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "1rem",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#222",
          color: "#fff",
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
          padding: "1rem",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          ×
        </button>

        <h2>{movieDetail.title}</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <img
            src={
              movieDetail.poster_path
                ? `https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`
                : "/assets/img/no-image.png"
            }
            alt={movieDetail.title}
            style={{ borderRadius: "6px", width: "200px", objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <p>{movieDetail.overview}</p>
            <p>
              <strong>導演:</strong>{" "}
              {movieDetail.credits.crew
                .filter((c) => c.job === "Director")
                .map((d) => d.name)
                .join(", ")}
            </p>
            <p>
              <strong>主要演員:</strong>{" "}
              {movieDetail.credits.cast
                .slice(0, 5)
                .map((c) => c.name)
                .join(", ")}
            </p>
          </div>
        </div>

        {movieDetail.reviews.results.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h3>評論</h3>
            {movieDetail.reviews.results.slice(0, 3).map((r, idx) => (
              <div key={idx} style={{ marginBottom: "0.5rem" }}>
                <p>
                  <strong>{r.author}:</strong> {r.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
