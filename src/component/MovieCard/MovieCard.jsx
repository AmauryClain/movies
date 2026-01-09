import styles from './MovieCard.module.css';
import { Link } from 'react-router';
export default function MovieCard({
    id,
    img,
    title,
    overview,
    releaseDate,
    voteAverage
}) {
    return (
        <div className={styles.card}>
            <img className={styles.img} src={img} alt={title} />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.overview}>{overview}</p>
            <div className={styles.metaRow}>
                <span>{releaseDate}</span>
                <span className={styles.badge}>{voteAverage} / 10</span>
            </div>
            <Link to={"/movies/"+id} className={styles.detailBtn}>Plus de détails</Link>
        </div>
    );
}