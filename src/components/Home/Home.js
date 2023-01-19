import styles from './Home.module.css';
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCausesContext } from "../../contexts/CauseContext";
import { db } from "../../firebase";
import { Spinner } from "../../shared/Spinner";
import { CardTemplate } from "./CardTemplate";
import 'react-toastify/dist/ReactToastify.css';
import { getLatestCauses } from '../../services/causesService';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { CarouselItem } from './CarouselItem';



export const Home = () => {
    const { currentUser } = useAuth();
    const { causes, setCauses } = useCausesContext();
    const [isLoading, setIsLoading] = useState(true);

    const causesCollectionRef = collection(db, "causes");
    const orderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'), limit(3));

    if (currentUser) {
        console.log("CurrentUserId", currentUser.uid);
    }

    useEffect(() => {
        document.title = 'Make Some Good';

        try {
            getLatestCauses(orderedQuery, setCauses, setIsLoading, () => null);
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <>
            <div className={styles['home']}>
                <div className={styles['hero']}>
                    <img src={require('../../../src/assets/hero.png')} alt="" />
                    <h1 className={styles['home-title']}>Make Some Good</h1>
                    <h1 className={styles['home-quote']}>“No one has ever become poor by giving.”</h1>
                    <h1 className={styles['home-quote-author']}>― Anne Frank</h1>
                </div>
                <h2 className={styles['latest-topics-title']}>Latest Causes</h2>
                {isLoading
                    ? (<Spinner />)
                    : causes.length !== 0 &&
                    <div className={styles['carousel-container']}>
                        < Carousel >
                            {causes.map((c) => <CarouselItem key={c.id} id={c.id} fields={c.fields} />)}
                        </Carousel>
                    </div>}
                <div className={styles['home-container']}>
                    {isLoading
                        ? (<Spinner />)
                        : causes.length !== 0
                            ?
                            <>


                                {/* {causes.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />)} */}


                            </>


                            : (<h3 className="no-articles">No articles yet</h3>)
                    }
                </div>
            </div>
        </>
    );
}