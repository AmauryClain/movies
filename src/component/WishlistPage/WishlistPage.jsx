import { Link } from "react-router";
import useWishlist from "../../context/useWishlist.jsx";

export default function WishlistPage() {
    const { wishlistMovies, removeFromWishlist } = useWishlist();

    if (wishlistMovies.length === 0) {
        return (
            <div>
                <h1>Ma liste de souhaits</h1>
                <p>Votre liste de souhaits est vide.</p>
                <Link to="/">Retour à la liste des films</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Ma liste de souhaits</h1>
            <ul>
                {wishlistMovies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <button onClick={() => removeFromWishlist(movie.id)}>Retirer de la liste de souhaits</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}