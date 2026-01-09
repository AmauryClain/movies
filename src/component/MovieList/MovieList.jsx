import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';
function MovieList() {
    const [movies, setMovies] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY+"&language=fr")
            .then((response) => response.json())
            .then((data) => setMovies(data.results ?? []))
            .catch((error) => console.error("Error fetching movies:", error));
    }, [API_KEY]);
    return (
        <div>
            <h1>Movie List</h1>
            <div className={styles.list}>
                {movies.map((movie) => (
                    <MovieCard 
                        id = {movie.id}
                        img = {"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                        title = {movie.title}
                        overview = {movie.overview}
                        releaseDate = {movie.release_date}
                        voteAverage = {movie.vote_average}
                    />
                ))}
            </div>
        </div>
    );
}
export default MovieList