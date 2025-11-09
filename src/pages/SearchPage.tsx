import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Movie } from "@/hooks/useFavorites";
import loadingAnimation from "../assets/json/cat.json";
import MovieModal from "../components/MovieModal";
import MovieGrid from "../components/MovieGrid";
import Lottie from "lottie-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const [favorites, setFavorites] = useState<any[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 初始化收藏功能
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  // 新增收藏/移除收藏切換
  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.find((f) => f.id === movie.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // 抓推薦電影
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => setDebouncedQuery(query), 2000);
    return () => clearTimeout(timer);
  }, [query]);

  // 抓搜尋結果
  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    async function fetchMovies() {
      setError("");
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            debouncedQuery
          )}&language=zh-TW`
        );
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();
        // console.log("data", data);
        setMovies(data.results || []);
      } catch (err) {
        setError("搜尋時發生錯誤，請稍後再試。");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <main className="main">
      <h3>搜尋結果：「{query}」</h3>

      {loading && (
        <div className="loading-container">
          <Lottie
            animationData={loadingAnimation}
            loop
            style={{ width: 300 }}
          />
        </div>
      )}

      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && movies.length === 0 && debouncedQuery && (
        <p>沒有找到相關電影。</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onMovieClick={(id) => {
            setSelectedMovieId(id);
            setIsModalOpen(true);
          }}
        />
      )}

      <MovieModal
        movieId={selectedMovieId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
