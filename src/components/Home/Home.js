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
        try {
            getLatestCauses(orderedQuery, setCauses, setIsLoading, () => null);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className={styles['home']}>
                <h1 className={styles['home-title']}>Make Some Good</h1>
                <h1 className={styles['home-quote']}>âNo one has ever become poor by giving.â</h1>
                <h1 className={styles['home-quote-author']}>â Anne Frank</h1>
                <h2 className={styles['latest-topics-title']}>Latest Causes</h2>
                <div className={styles['home-container']}>
                    {isLoading
                        ? (<Spinner />)
                        : causes.length !== 0
                            ? (causes.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                            : (<h3 className="no-articles">No articles yet</h3>)
                    }
                </div>
            </div>
        </>
    );
}