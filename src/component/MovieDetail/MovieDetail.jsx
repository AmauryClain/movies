import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useWishlist from "../../context/useWishlist.jsx";
import styles from "./MovieDetail.module.css";
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

    function getWishlistButtonClassName() {
        if (isMovieInWishlist(movie.id)) {
            return styles.wishlistBtn + " " + styles.wishlistBtnActive;
        }
        return styles.wishlistBtn;
    }

    return (
        <div className={styles.page}>
            <Link className={styles.backLink} to="/">Retour à la liste</Link>
            <div className={styles.hero}>
                <div className={styles.posterWrap}>
                    <div className={styles.posterGlow}></div>
                    <button className={getWishlistButtonClassName()} onClick={handleWishlistClick}>
                        {isMovieInWishlist(movie.id) ? "★ Dans la wishlist" : "+ Wishlist"}
                    </button>
                    <img className={styles.poster} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                    <div className={styles.info}>
                        <h1 className={styles.title}>{movie.title}</h1>
                        <div className={styles.tagRow}>
                            <span className={styles.chip}>⭐ {movie.vote_average} / 10</span>
                            <span className={styles.chip}>📅 {movie.release_date}</span>
                            {movie.runtime ? <span className={styles.chip}>⏱️ {movie.runtime} min</span> : null}
                        </div>
                        <p className={styles.metaText}>
                            Genres : {movie.genres && movie.genres.length > 0 ? movie.genres.map(function (g) { return g.name; }).join(", ") : "—"}
                        </p>
                        <div className={styles.overviewBox}>
                            <h2 className={styles.sectionTitle}>Synopsis</h2>
                            <p className={styles.overview}>{movie.overview}</p>
                        </div>
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Acteurs principaux</h2>
                            <div className={styles.castGrid}>
                                {(movie.credits && movie.credits.cast ? movie.credits.cast.slice(0, 10) : []).map(function (actor) {
                                    return (
                                    <span className={styles.actorChip} key={actor.id}>
                                        {actor.name}
                                    </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
