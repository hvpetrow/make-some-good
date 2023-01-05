import styles from './Catalog.module.css';

import { collection, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useCausesContext } from "../../../contexts/CauseContext";
import { db } from "../../../firebase";
import { getAll } from "../../../services/crudService";
import { BackToTheTopButton } from "../../../shared/BackToTheTopButton";
import { Spinner } from "../../../shared/Spinner";
import { CardTemplate } from "../../Home/CardTemplate";



const causesCollectionRef = collection(db, "causes");


export const Catalog = () => {
    const { causes, setCauses } = useCausesContext();
    const [isLoading, setIsLoading] = useState(true);
    const [latestDoc, setLatestDoc] = useState(0);
    const [clickable, setClickable] = useState(true);

    const startingOrderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'), limit(3));

    useEffect(() => {
        try {
            getAll(startingOrderedQuery)
                .then(docs => {
                    let arr = [];

                    docs.forEach((doc) => {
                        let fields = doc.data();
                        console.log(doc.data());

                        arr.push({
                            id: doc.id,
                            fields: fields
                        });
                    });

                    setCauses(arr);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreClickHandler = async (e) => {
        const nextOrderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'), startAfter(latestDoc), limit(3));

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

                    setCauses(oldArr => [
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
        <section className={styles['catalog']}>
            <h1 className={styles['catalog-title']}>Make some good</h1>
            {isLoading
                ? (<Spinner />)
                : (<>
                    <div className={styles['catalog-container']}>
                        {isLoading
                            ? (<Spinner />)
                            : causes.length !== 0
                                ? (causes.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                                : (<h3 className="no-articles">No articles yet</h3>)
                        }
                    </div>
                    {(clickable && causes.length !== 0) &&
                        <div className={styles['load-more-btn-cont']}>
                            <button id="load-more-button" className={styles['load-more-button']}
                                type="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={loadMoreClickHandler}
                            >load more</button>
                        </div>
                    }

                    <BackToTheTopButton />
                </>)
            }
        </section>
    );
}