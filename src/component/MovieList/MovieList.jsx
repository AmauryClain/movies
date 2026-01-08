import { useEffect, useState } from "react";
function MovieList() {
    const [movies, setMovies] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY)
            .then((response) => response.json())
            .then((data) => setMovies(data.results ?? []))
            .catch((error) => console.error("Error fetching movies:", error));
    }, [API_KEY]);
    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MovieList