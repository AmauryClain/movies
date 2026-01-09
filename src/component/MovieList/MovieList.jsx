import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';
export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY;
    useEffect(function () {
        function fetchMovies() {
            setLoading(true);
            setErrorMessage("");
            fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY+"&language=fr&page="+page)
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data.results ?? []);
                    setTotalPages(data.total_pages ?? 1);
                    setLoading(false);
                    window.scrollTo(0, 0);
                })
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                    setErrorMessage("Une erreur est survenue lors du chargement des films.");
                    setLoading(false);
                });
        }
        fetchMovies();
    }, [API_KEY, page]);

    function goToNextPage() {
        setPage(function (currentPage) {
            return Math.min(totalPages, currentPage + 1);
        });
    }

    function goToPreviousPage() {
        setPage(function (currentPage) {
            return Math.max(1, currentPage - 1);
        });
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Liste des films</h1>
                <p className={styles.subtitle}>Les films populaires - 20 films par page</p>
            </div>
            <div className={styles.pagination}>
                <button onClick={goToPreviousPage} disabled={page === 1 || loading} className={styles.pageBtn} type="button">
                    Précédent
                </button>
                <span className={styles.pageInfo}>
                    Page {page} / {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={page >= totalPages || loading} className={styles.pageBtn} type="button">
                    Suivant
                </button>
            </div>
            {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
            {loading ? <p className={styles.loading}>Chargement...</p> : null}
            <div className={styles.list}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.cardWrapper}>
                        <MovieCard 
                            id={movie.id}
                            img = {"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                            title = {movie.title}
                            overview = {movie.overview}
                            releaseDate = {movie.release_date}
                            voteAverage = {movie.vote_average}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}