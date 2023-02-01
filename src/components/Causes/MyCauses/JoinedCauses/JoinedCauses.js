import styles from './JoinedCauses.module.css';

import { collection, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../../contexts/AuthContext';
import { db } from '../../../../firebase';
import { Spinner } from '../../../../shared/Spinner';
import { CardTemplate } from '../../../Home/CardTemplate/CardTemplate';
import { getLatestCauses, loadThreeCauses } from '../../../../services/causesService';
import { BackToTheTopButton } from '../../../../shared/BackToTheTopButton';

const causesCollectionRef = collection(db, "causes");


export const JoinedCauses = () => {
    const { currentUser } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [clickable, setClickable] = useState(true);
    const [myCauses, setCauses] = useState([]);
    const [latestDoc, setLatestDoc] = useState(0);

    const startingOrderedQuery = query(causesCollectionRef, where("participants", "array-contains", currentUser.uid), orderBy("createdAt", 'desc'), limit(3));

    useEffect(() => {
        document.title = 'Joined Causes';

        try {
            getLatestCauses(startingOrderedQuery, setCauses, setIsLoading, setLatestDoc);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreClickHandler = async (e) => {
        const nextOrderedQuery = query(causesCollectionRef, where("participants", "array-contains", currentUser.uid), orderBy('createdAt', 'desc'), startAfter(latestDoc), limit(3));

        try {
            loadThreeCauses(nextOrderedQuery, setCauses, setLatestDoc, setIsLoading, setClickable, toast);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section id={styles['joined-causes']}>
            <h1 className={styles['title']}>Joined Causes</h1>
            <div className={styles['causes-ctn']}>
                {isLoading
                    ? (<Spinner />)
                    : myCauses.length !== 0
                        ? (myCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                        : (<h3 className={styles['no-articles-title']}>No articles yet</h3>)
                }
            </div>
            {(clickable && myCauses.length !== 0) &&
                <div className={styles['btn-ctn']}>
                    <button id="load-more-button" className={styles['load-more-btn']}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={loadMoreClickHandler}>load more</button>
                </div>
            }
            {myCauses.length !== 0 &&
                <BackToTheTopButton />
            }
        </section>
    );
}
