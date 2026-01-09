import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    // chargement de la wishlist
    const [wishlistMovies, setWishlistMovies] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlistMovies");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // sauvegarde de la wishlist à chaque modification
    useEffect(() => {
        localStorage.setItem("wishlistMovies", JSON.stringify(wishlistMovies));
    }, [wishlistMovies]);

    function isMovieInWishlist(movieId) {
        return wishlistMovies.some(movie => movie.id === movieId);
    }

    function addMovieToWishlist(movieToAdd) {
        setWishlistMovies((currentWishlist) => {
            function alreadyExists(currentWishlist) {
                return currentWishlist.some(
                    (movie) => movie.id === movieToAdd.id
                );
            }

            if (alreadyExists(currentWishlist)) {
                return currentWishlist;
            }

            return [movieToAdd, ...currentWishlist];
        });
    }

    function removeFromWishlist(movieIdToRemove) {
        setWishlistMovies((currentWishlist) => currentWishlist.filter(movie => movie.id !== movieIdToRemove));
    }

    // si présent, retire le film, sinon l'ajoute
    function toggleMovieInWishlist(movieToToggle) {
        setWishlistMovies((currentWishlist) => {
            function alreadyExists(currentWishlist) {
                return currentWishlist.some((movie) => movie.id === movieToToggle.id);
            }

            if (alreadyExists(currentWishlist)) {
                return currentWishlist.filter(movie => movie.id !== movieToToggle.id);
            }

            return [movieToToggle, ...currentWishlist];
        });
    }

    return (
        <WishlistContext.Provider 
            value={{
                wishlistMovies,
                isMovieInWishlist,
                addMovieToWishlist,
                removeFromWishlist,
                toggleMovieInWishlist
            }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function usewishlist() {
    const contextValue = useContext(WishlistContext);

    if (!contextValue) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }

    return contextValue;
}