import { useNavigate } from 'react-router-dom';
import styles from './CarouselItem.module.css';

import { Paper } from '@mui/material';

export function CarouselItem(props) {
    const navigate = useNavigate();

    return (
        <Paper>
            < h2 className={styles['carousel-title']} > {props.fields.title}</h2 >
            <p className={styles['carousel-text']}>{props.fields.place}</p>
            <img className={styles['carousel-img']} src={props.fields.imgUrl} onClick={() => navigate(`/details/${props.id}`)} alt="causeImg" />
        </Paper >
    );
}