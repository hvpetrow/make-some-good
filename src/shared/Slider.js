import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Thumbnail from './Thumbnail/Thumbnail';
import styles from './Slider.module.css';
import { CardTemplate } from '../components/Home/CardTemplate';


const Slideshow = ({ thumbnail, imgs, causes }) => {
    const [index, setIndex] = useState(0);

    console.log(imgs);


    useEffect(() => {
        setIndex(0);
    }, []);

    const next = () => {
        if (index === imgs.length - 1) {
            setIndex(0);
        } else {
            setIndex(state => state + 1);
        }
    };

    const prev = () => {
        if (index === 0) {
            setIndex(imgs.length - 1);
        } else {
            setIndex(state => state - 1);
        }
    };

    const setImageIndexHandler = (index) => {
        setIndex(index);
    };

    return (
        <div className={styles.slideshow}>
            {/* <img className={styles.mainImg} src={imgs[index]} alt='causeImg' /> */}
            <CardTemplate key={causes[index].id} id={causes[index].id} cause={causes[index].fields} />
            <div className={styles.actions}>
                <button onClick={prev}><FontAwesomeIcon icon={faAngleLeft} /></button>
                <button onClick={next}><FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
            {thumbnail
                && <Thumbnail
                    arr={imgs}
                    setImageIndexHandler={setImageIndexHandler}
                    index={index}
                />
            }
        </div>
    )
};

export default Slideshow;