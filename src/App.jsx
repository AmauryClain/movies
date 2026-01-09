import { Routes, Route } from "react-router";
import MovieList from "./component/MovieList/MovieList.jsx";
import MovieDetail from "./component/MovieDetail/MovieDetail.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
    </Routes>
  )
}

export default App
