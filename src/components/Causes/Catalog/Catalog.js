import styles from './Catalog.module.css';
import { collection, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCausesContext } from "../../../contexts/CauseContext";
import { db } from "../../../firebase";
import { BackToTheTopButton } from "../../../shared/BackToTheTopButton";
import { Spinner } from "../../../shared/Spinner";
import { CardTemplate } from "../../Home/CardTemplate/CardTemplate";
import { getLatestCauses, loadThreeCauses } from '../../../services/causesService';
import React from 'react';
import useTitle from '../../../hooks/useTitle';

const causesCollectionRef = collection(db, "causes");

export const Catalog = () => {
    const { causes, setCauses } = useCausesContext();
    const [isLoading, setIsLoading] = useState(true);
    const [isNextButtonLoading, setIsNextButtonLoading] = useState(false);
    const [latestDoc, setLatestDoc] = useState(0);
    const [clickable, setClickable] = useState(true);

    useTitle('Catalog');

    const startingOrderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'), limit(3));

    useEffect(() => {
        try {
            getLatestCauses(startingOrderedQuery, setCauses, setIsLoading, setLatestDoc);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreClickHandler = async (e) => {
        setIsNextButtonLoading(true);
        const nextOrderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'), startAfter(latestDoc), limit(3));

        try {
            loadThreeCauses(nextOrderedQuery, setCauses, setLatestDoc, setIsLoading, setClickable, toast);
        } catch (error) {
            console.log(error);
        }

        setIsNextButtonLoading(false);
    }

    return (
        <section className={styles['catalog']}>
            <h1 className={styles['catalog-title']}>Catalog</h1>
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
                                disabled={isNextButtonLoading}
                            >load more</button>
                        </div>
                    }

                    {causes.length !== 0 &&
                        <BackToTheTopButton />
                    }
                </>)
            }
        </section>
    );
}