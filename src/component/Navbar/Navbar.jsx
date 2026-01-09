import { NavLink } from "react-router";
import useWishlist from "../../context/useWishlist.jsx";
export default function Navbar() {
    const { wishlistMovies } = useWishlist();

    return (
        <nav>
            <ul>
                <li><NavLink to="/">Accueil</NavLink></li>
                <li><NavLink to="/wishlist">Ma liste de souhaits ({wishlistMovies.length})</NavLink></li>
            </ul>
        </nav>
    );
}