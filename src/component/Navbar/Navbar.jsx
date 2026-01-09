import { NavLink } from "react-router";
import useWishlist from "../../context/useWishlist.jsx";
import styles from "./Navbar.module.css";
export default function Navbar() {
    const { wishlistMovies } = useWishlist();

    function getLinkClassName(isActive) {
        return isActive ? styles.link + " " + styles.active : styles.link;
    }


    return (
        <header className={styles.wrapper}>
            <nav className={styles.nav}>
                <NavLink to="/" end className={styles.brand}>
                    <span className={styles.logo}>🎬</span>
                    <span className={styles.brandText}>ReactFlix</span>
                </NavLink>

                <div className={styles.links}>
                    <NavLink
                        to="/"
                        end
                        className={function ({ isActive }) {
                        return getLinkClassName(isActive);
                        }}
                    >
                        Films
                    </NavLink>

                    <NavLink
                        to="/wishlist"
                        className={function ({ isActive }) {
                        return getLinkClassName(isActive);
                        }}
                    >
                        Wishlist
                        <span className={styles.badge}>{wishlistMovies.length}</span>
                    </NavLink>
                </div>
        </nav>
        </header>
    );
}