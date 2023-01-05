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
    const [visible, setVisible] = useState(true);

    const orderedQuery = query(causesCollectionRef, orderBy('createdAt'), startAfter(latestDoc || 0), limit(3));

    useEffect(() => {
        try {
            getAll(orderedQuery)
                .then(docs => {
                    let arr = [];

                    docs.forEach((doc) => {
                        let fields = doc.data();
                        console.log(doc.data());

                        arr.push({
                            id: doc.id,
                            fields: fields
                        });
                        console.log(doc.id, " => ", doc.data());
                    });

                    setCauses(arr);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                    console.log("Docs " + docs.docs.length);
                    console.log("LATEST DOC", latestDoc);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreClickHandler = async (e) => {
        console.log("load more clicked");
        try {
            getAll(orderedQuery)
                .then(docs => {
                    if (docs.empty) {
                        setClickable(false);
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

                    console.log("LATEST DOC", latestDoc);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }

    console.log(causes);

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
                    {visible &&
                        <div className={styles['load-more-btn-cont']}>
                            <button id="load-more-button" className={styles['load-more-button']}
                                type="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={clickable ? loadMoreClickHandler : () => {
                                    toast.warning('No more causes', {
                                        position: toast.POSITION.BOTTOM_CENTER
                                    });
                                    setVisible(false);
                                }}>load more</button>
                        </div>
                    }

                    <BackToTheTopButton />
                </>)
            }
        </section>
    );
}