import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';
export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;
    useEffect(function () {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY+"&language=fr")
            .then((response) => response.json())
            .then((data) => setMovies(data.results ?? []))
            .catch((error) => console.error("Error fetching movies:", error));
    }, [API_KEY]);
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Liste des films</h1>
                <p className={styles.subtitle}>Les films populaires</p>
            </div>
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