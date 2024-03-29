import styles from './MyCauses.module.css';

import { collection, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useCallback, useEffect } from "react";

import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";
import { CardTemplate } from "../../../Home/CardTemplate/CardTemplate";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../../../../shared/Spinner";
import { getLatestCauses, loadThreeCauses } from "../../../../services/causesService";
import { BackToTheTopButton } from '../../../../shared/BackToTheTopButton';
import useTitle from '../../../../hooks/useTitle';

const causesCollectionRef = collection(db, "causes");

const MyCauses = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [clickable, setClickable] = useState(true);
    const [myCauses, setMyCauses] = useState([]);
    const [latestDoc, setLatestDoc] = useState(0);

    useTitle('My Causes');

    const startingOrderedQuery = query(causesCollectionRef, where("creator", "==", currentUser.uid), orderBy("createdAt", 'desc'), limit(3));

    useEffect(() => {
        try {
            getLatestCauses(startingOrderedQuery, setMyCauses, setIsLoading, setLatestDoc);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreClickHandler = useCallback(async (e) => {
        const nextOrderedQuery = query(causesCollectionRef, where("creator", "==", currentUser.uid), orderBy("createdAt", 'desc'), startAfter(latestDoc), limit(3));

        try {
            loadThreeCauses(nextOrderedQuery, setMyCauses, setLatestDoc, setIsLoading, setClickable, toast);
        } catch (error) {
            console.log(error);
        }
    }, [currentUser.uid, latestDoc]);

    return (
        <section id={styles['my-causes']}>
            <h1 className={styles['my-causes-title']}>My Causes</h1>
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

export default MyCauses;
