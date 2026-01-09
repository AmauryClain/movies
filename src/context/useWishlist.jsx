import { useContext } from "react";
import { WishlistContext } from "./WishlistContext.jsx";
export default function useWishlist() {
    const contextValue = useContext(WishlistContext);

    if (!contextValue) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }

    return contextValue;
}