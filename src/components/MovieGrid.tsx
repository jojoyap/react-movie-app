import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: any[];
  favorites: any[];
  onToggleFavorite: (movie: any) => void;
  onMovieClick: (movieId: number) => void;
}

export default function MovieGrid({
  movies,
  favorites,
  onToggleFavorite,
  onMovieClick,
}: MovieGridProps) {
  const isFavorite = (m: any) => favorites.some((f) => f.id === m.id);

  return (
    <div
      className="movie-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem",
      }}
    >
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          movie={m}
          isFavorite={isFavorite(m)}
          onToggleFavorite={onToggleFavorite}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
}
