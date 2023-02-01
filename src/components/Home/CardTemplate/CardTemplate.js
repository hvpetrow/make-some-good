import styles from './CardTemplate.module.css';

import { Link } from "react-router-dom";

export const CardTemplate = ({ id, cause }) => {
    return (
        <div className={styles['card-cont']}>
            <div className={styles['card']}>
                <Link to={`/details/${id}`}>
                    <img
                        className={styles['card-img']}
                        src={cause.imgUrl}
                        alt="causeImg"
                    />
                </Link>
                <div className={styles['card-details']}>
                    <h5>{cause.title}</h5>
                    <p>{cause.place}</p>
                    <Link to={`/details/${id}`} className={styles['card-details-btn']}>Details</Link>
                </div>
            </div>
        </div>
    );
}