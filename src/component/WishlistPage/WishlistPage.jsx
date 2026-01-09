import { Link } from "react-router";
import useWishlist from "../../context/useWishlist.jsx";
import styles from "./WishlistPage.module.css";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const wishlistMovies = wishlist.wishlistMovies;
  const removeFromWishlist = wishlist.removeFromWishlist;

  if (wishlistMovies.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ma wishlist</h1>
          <p className={styles.subtitle}>0 film sauvegardé</p>
        </div>

        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>Rien ici pour l’instant</h2>
          <p className={styles.emptyText}>
            Ajoute des films depuis la page détail pour les retrouver ici.
          </p>

          <Link className={styles.primaryBtn} to="/">
            Découvrir des films
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ma wishlist</h1>
        <p className={styles.subtitle}>
          {wishlistMovies.length} film(s) sauvegardé(s)
        </p>
      </div>

      <div className={styles.list}>
        {wishlistMovies.map(function (wishlistMovie) {
          const movieDetailUrl = "/movies/" + wishlistMovie.id;
          const hasPoster = Boolean(wishlistMovie.poster_path);

          return (
            <div className={styles.cardWrapper} key={wishlistMovie.id}>
              <div className={styles.card}>
                <Link
                  className={styles.posterLink}
                  to={movieDetailUrl}
                  aria-label={"Voir le détail de " + wishlistMovie.title}
                >
                  {hasPoster ? (
                    <img
                      className={styles.poster}
                      src={
                        "https://image.tmdb.org/t/p/w500" +
                        wishlistMovie.poster_path
                      }
                      alt={wishlistMovie.title}
                    />
                  ) : (
                    <div className={styles.posterFallback}>No poster</div>
                  )}
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.topRow}>
                    <Link className={styles.movieTitle} to={movieDetailUrl}>
                      {wishlistMovie.title}
                    </Link>

                    {typeof wishlistMovie.vote_average === "number" ? (
                      <span className={styles.badge}>
                        ⭐ {wishlistMovie.vote_average.toFixed(1)}
                      </span>
                    ) : null}
                  </div>

                  <p className={styles.meta}>
                    {wishlistMovie.release_date
                      ? "Sortie : " + wishlistMovie.release_date
                      : "Date inconnue"}
                  </p>

                  <div className={styles.actions}>
                    <Link className={styles.secondaryBtn} to={movieDetailUrl}>
                      Voir le détail
                    </Link>

                    <button
                      className={styles.dangerBtn}
                      type="button"
                      onClick={function () {
                        removeFromWishlist(wishlistMovie.id);
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                </div>

                <div className={styles.cardGlow} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
