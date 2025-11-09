import { useRef } from "react";
import gsap from "gsap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface MovieCardProps {
  movie: { id: number; title: string; poster_path: string | null };
  isFavorite: boolean;
  onToggleFavorite: (movie: any) => void;
  onClick: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onClick,
}: MovieCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        boxShadow: "0 15px 25px rgba(0,0,0,0.6)",
        duration: 0.3,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="movie-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(movie.id)}
      style={{
        position: "relative",
        borderRadius: "6px",
        cursor: "pointer",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.05)",
      }}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
            : "/assets/img/no-image.png"
        }
        alt={movie.title}
        style={{ width: "100%", objectFit: "cover", display: "block" }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(movie);
        }}
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
          color: isFavorite ? "red" : "#fff",
          cursor: "pointer",
        }}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
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
        {movie.title}
      </span>
    </div>
  );
}
