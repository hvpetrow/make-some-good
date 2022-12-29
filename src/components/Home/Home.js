import styles from './Home.module.css';
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCausesContext } from "../../contexts/CauseContext";
import { db } from "../../firebase";
import { getAll } from "../../services/crudService";
import { Spinner } from "../../shared/Spinner";
import { CardTemplate } from "./CardTemplate";
import 'react-toastify/dist/ReactToastify.css';




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
            getAll(orderedQuery)
                .then(docs => {
                    let arr = [];
                    docs.forEach((doc) => {
                        let fields = doc.data();

                        arr.push({
                            id: doc.id,
                            fields: fields
                        });
                    });

                    setCauses(arr);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className={styles['home']}>
                <h1 className={styles['home-title']}>Make Some Good</h1>
                <h1 className={styles['home-quote']}>“No one has ever become poor by giving.”</h1>
                <h1 className={styles['home-quote-author']}>― Anne Frank</h1>
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