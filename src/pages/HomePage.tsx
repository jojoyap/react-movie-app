import { useEffect, useState } from "react";
import { Movie } from "@/hooks/useFavorites";
import MovieModal from "../components/MovieModal";
import MovieGrid from "../components/MovieGrid";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface Genre {
  id: number;
  name: string;
}

export default function HomePage() {
  const [recommended, setRecommended] = useState<
    { category: string; movies: Movie[] }[]
  >([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 初始化收藏功能
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  // 新增收藏/移除收藏切換
  const toggleFavorite = (movie: Movie) => {
    // console.log("favorites", favorites);
    const exists = favorites.find((f) => f.id === movie.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // 抓推薦電影
  useEffect(() => {
    async function fetchRecommended() {
      const genreRes = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const genres: Genre[] = (await genreRes.json()).genres;
      const topGenres = genres.slice(0, 5);

      const results = await Promise.all(
        topGenres.map(async (g) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${g.id}&sort_by=popularity.desc&page=1&language=zh-TW`
          );
          // console.log("res", res);
          const data = await res.json();
          return { category: g.name, movies: data.results.slice(0, 10) };
        })
      );

      setRecommended(results);
    }

    fetchRecommended();
  }, []);

  return (
    <div className="defaultMovieTable">
      <div className="recommendedMovies">
        {recommended.map((cat) => (
          <section key={cat.category} className="category">
            <h3 style={{ marginBottom: "1rem" }}>{cat.category}</h3>
            <MovieGrid
              movies={cat.movies}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onMovieClick={(id) => {
                setSelectedMovieId(id);
                setIsModalOpen(true);
              }}
            />
          </section>
        ))}
      </div>

      <MovieModal
        movieId={selectedMovieId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
