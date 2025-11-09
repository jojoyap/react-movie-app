import { useEffect, useState } from "react";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.some((f) => f.id === movie.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (movie: Movie) => favorites.some((f) => f.id === movie.id);

  return { favorites, toggleFavorite, isFavorite };
}
