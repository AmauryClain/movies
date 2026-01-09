import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useWishlist from "../../context/useWishlist.jsx";
export default function MovieDetail() {
    const { id } = useParams();
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isMovieInWishlist, toggleMovieInWishlist } = useWishlist();

    useEffect(function () {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr&append_to_response=credits`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching movie details:", error));
    }), [id, API_KEY];

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!movie) {
        return <p>Film non trouvé</p>;
    }

    function handleWishlistClick() {
        const movieToSaveInWishlist = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path
        };
        toggleMovieInWishlist(movieToSaveInWishlist);
    }

    return (
        <div>
            <Link to="/">Retour à la liste des films</Link>
            <h1>{movie.title}</h1>
            <button onClick={handleWishlistClick}>
                {isMovieInWishlist(movie.id) ? "Retirer de la liste de souhaits" : "Ajouter à la liste de souhaits"}
            </button>
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>Date de sortie : {movie.release_date}</p>
            <p>Note : {movie.vote_average} / 10</p>
            <h2>Genres</h2>
            <ul>
                {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <h2>Acteurs principaux</h2>
            <ul>
                {movie.credits.cast.slice(0, 10).map((actor) => (
                    <li key={actor.id}>{actor.name}</li>
                ))}
            </ul>
        </div>
    );
}
