import styles from './Home.module.css';
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCausesContext } from "../../contexts/CauseContext";
import { db } from "../../firebase";
import { Spinner } from "../../shared/Spinner";
import 'react-toastify/dist/ReactToastify.css';
import { getLatestCauses } from '../../services/causesService';

import Slider from '../../shared/Slider';
import { getAll } from '../../services/crudService';
import { BackToTheTopButton } from '../../shared/BackToTheTopButton';



export const Home = () => {
    const { currentUser } = useAuth();
    const { causes, setCauses } = useCausesContext();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUsersLoading, setIsUsersLoading] = useState(true);


    const causesCollectionRef = collection(db, "causes");
    const orderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'), limit(3));
    const usersCollectionRef = collection(db, 'users');
    const usersWithMostCausesCollQuery = query(usersCollectionRef, orderBy('causes', 'desc'), limit(3));


    if (currentUser) {
        console.log("CurrentUserId", currentUser.uid);
    }

    useEffect(() => {
        document.title = 'Make Some Good';



        try {
            getLatestCauses(orderedQuery, setCauses, setIsLoading, () => null);

            getAll(usersWithMostCausesCollQuery)
                .then(usersDocs => {
                    let arr = [];
                    usersDocs.forEach(doc => {
                        let fields = doc.data();
                        arr.push({
                            id: doc.id,
                            fields: fields
                        });
                    });

                    setUsers(arr);
                }).finally(() => {
                    setIsUsersLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const imgs = causes.map(c => c.fields.imgUrl);

    return (
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
                : causes.length !== 0
                    ? <div className={styles['carousel-container']}>
                        <Slider thumbnail={''} imgs={imgs} causes={causes} />
                    </div>
                    : (<h3 className="no-articles">No articles yet</h3>)}
            <article className='hero-of-month'>
                <h2 className={styles.discount}>
                    HEROES OF THE MONTH
                </h2>
                {isUsersLoading
                    ? <Spinner />
                    : <div className={styles['carousel-container']}>
                        <Slider thumbnail={''} imgs={users} users={users} />
                    </div>
                }
            </article>

            <BackToTheTopButton />
        </div>
    );
}