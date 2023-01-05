import styles from './JoinedCauses.module.css';

import { collection, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { getAll } from '../../../services/crudService';
import { Spinner } from '../../../shared/Spinner';
import { CardTemplate } from '../../Home/CardTemplate';

const causesCollectionRef = collection(db, "causes");


export const JoinedCauses = () => {
    const { currentUser } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [clickable, setClickable] = useState(true);
    const [myCauses, setMyCauses] = useState([]);
    const [latestDoc, setLatestDoc] = useState(0);

    const startingOrderedQuery = query(causesCollectionRef, where("participants", "array-contains", currentUser.uid), orderBy("createdAt", 'desc'), limit(3));

    useEffect(() => {
        try {
            getAll(startingOrderedQuery)
                .then(docs => {
                    let arr = [];

                    docs.forEach((doc) => {
                        let fields = doc.data();

                        arr.push({
                            id: doc.id,
                            fields: fields
                        });

                    });

                    setMyCauses(arr);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }

    }, []);

    const loadMoreClickHandler = async (e) => {
        const nextOrderedQuery = query(causesCollectionRef, where("participants", "array-contains", currentUser.uid), orderBy('createdAt', 'desc'), startAfter(latestDoc), limit(3));

        try {
            getAll(nextOrderedQuery)
                .then(docs => {
                    if (docs.empty) {
                        setClickable(false);
                        toast.warning('There are no more causes!');
                        return;
                    }
                    let arr = [];

                    docs.forEach((doc) => {
                        let fields = doc.data();

                        arr.push({
                            id: doc.id,
                            fields: fields
                        });
                    });

                    setMyCauses(oldArr => [
                        ...oldArr,
                        ...arr
                    ]);

                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                }).then(() => {
                    setIsLoading(false);
                });
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
        </section>
    );
}
