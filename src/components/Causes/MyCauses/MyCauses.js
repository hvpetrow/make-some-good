import styles from './MyCauses.module.css';

import { collection, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { CardTemplate } from "../../Home/CardTemplate";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../../../shared/Spinner";
import { loadThreeMyCauses } from "../../../services/causesService";

const causesCollectionRef = collection(db, "causes");

export const MyCauses = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [clickable, setClickable] = useState(true);
    const [visible, setVisible] = useState(true);
    const [myCauses, setMyCauses] = useState([]);
    const [latestDoc, setLatestDoc] = useState(0);

    const orderedQuery = query(causesCollectionRef, where("creator", "==", currentUser.uid), orderBy("createdAt"), startAfter(latestDoc || 0), limit(3));

    useEffect(() => {
        try {
            loadThreeMyCauses(orderedQuery, setMyCauses, setLatestDoc, setIsLoading, setClickable);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreClickHandler = async (e) => {
        try {
            loadThreeMyCauses(orderedQuery, setMyCauses, setLatestDoc, setIsLoading, setClickable);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section id={styles['my-causes']}>
            <h1 className={styles['my-causes-title']}>My causes Page</h1>
            <div className={styles['causes-ctn']}>
                {isLoading
                    ? (<Spinner />)
                    : myCauses.length !== 0
                        ? (myCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                        : (<h3 className={styles['no-articles-title']}>No articles yet</h3>)
                }
            </div>
            {visible && myCauses.length !== 0 &&
                <div className={styles['btn-ctn']}>
                    <button id="load-more-button" className={styles['load-more-btn']}
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
        </section>
    );
}
