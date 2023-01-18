import styles from './CarouselItem.module.css';

import { Paper, Button } from '@mui/material';

export function CarouselItem(props) {
    return (

        <Paper>
            <h2 className={styles['carousel-title']}>{props.fields.title}</h2>
            <p className={styles['carousel-text']}>{props.fields.place}</p>
            <img className={styles['carousel-img']} src={props.fields.imgUrl} alt="" />
        </Paper>

    );
}