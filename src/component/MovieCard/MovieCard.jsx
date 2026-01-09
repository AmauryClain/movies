import styles from './MovieCard.module.css';
import { Link } from 'react-router';
function MovieCard({
    id,
    img,
    title,
    overview,
    releaseDate,
    voteAverage
}) {
    return (
        <div className={styles.card}>
            <Link to={"/movies/"+id} className={styles.detailsBtn}>Plus de détails</Link>
            <img className={styles.img} src={img} alt={title} />
            <h2>{title}</h2>
            <p>{overview}</p>
            <p>{releaseDate}</p>
            <p>{voteAverage} / 10</p>
        </div>
    );
}

export default MovieCard;