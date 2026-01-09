import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./SimilarMovies.module.css";

export default function SimilarMovies({ movieId }) {
    const limit = 10;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        if (!movieId) return;

        setLoading(true);

        fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=fr&page=1`
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const movies = (data.results ?? []).slice(0, limit);
            setSimilarMovies(movies);
            setLoading(false);
        })
        .catch(function (error) {
            console.error("Error fetching similar movies:", error);
            setSimilarMovies([]);
            setLoading(false);
        });
    }, [movieId, API_KEY, limit]);

    if (loading) {
        return (
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Films similaires</h2>
                <p className={styles.metaText}>Chargement...</p>
            </div>
        );
    }

    if (similarMovies.length === 0) {
        return (
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Films similaires</h2>
                <p className={styles.metaText}>Aucun film similaire trouvé.</p>
            </div>
        );
    }

    return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Films similaires</h2>

      <div className={styles.list}>
        {similarMovies.map(function (similarMovie) {
          const movieDetailUrl = "/movies/" + similarMovie.id;

          const posterUrl = similarMovie.poster_path
            ? "https://image.tmdb.org/t/p/w300" + similarMovie.poster_path
            : null;

          return (
            <Link
              key={similarMovie.id}
              className={styles.card}
              to={movieDetailUrl}
              aria-label={"Voir le détail de " + similarMovie.title}
            >
              {posterUrl ? (
                <img
                  className={styles.poster}
                  src={posterUrl}
                  alt={similarMovie.title}
                />
              ) : (
                <div className={styles.posterFallback}>No poster</div>
              )}

              <div className={styles.cardBody}>
                <p className={styles.title}>{similarMovie.title}</p>
                <p className={styles.rating}>
                  ⭐ {Number(similarMovie.vote_average || 0).toFixed(1)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}