import { Routes, Route } from "react-router";
import Navbar from "./component/Navbar/Navbar.jsx";
import MovieList from "./component/MovieList/MovieList.jsx";
import MovieDetail from "./component/MovieDetail/MovieDetail.jsx";
import WishlistPage from "./component/WishlistPage/WishlistPage.jsx";
export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
    </>
  )
}

