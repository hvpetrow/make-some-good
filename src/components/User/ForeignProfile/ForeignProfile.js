import styles from './ForeignProfile.module.css';

import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';
import { useCausesContext } from '../../../contexts/CauseContext';
import { db } from '../../../firebase';
import { getOne } from '../../../services/crudService';
import { Spinner } from '../../../shared/Spinner';
import { CardTemplate } from '../../Home/CardTemplate/CardTemplate';

const usersCollectionRef = collection(db, 'users');

export const ForeignProfile = () => {
    const [userInfo, setUserInfo] = useState('');
    const [profilePicture, setProfilePicture] = useState("https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png");
    const { getProfilePicture } = useAuth();
    const { filterForeignUserCauses, filterUserJoinedCauses } = useCausesContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [foreignUserCauses, setForeignUserCauses] = useState([]);
    const [userJoinedCauses, setUserJoinedCauses] = useState([]);


    const { userId } = useParams();

    useEffect(() => {
        const promises = [getProfilePicture(userId), getOne(usersCollectionRef, userId)];

        Promise.all(promises)
            .then(([url, doc]) => {
                setProfilePicture(url)
                setUserInfo(doc.data());
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            })

        setForeignUserCauses(filterForeignUserCauses(userId));
        setUserJoinedCauses(filterUserJoinedCauses(userId));

    }, [userId]);

    if (!isLoading) {
        document.title = `Profile/${userInfo.firstName} ${userInfo.lastName}`;
    }

    console.log(userInfo);

    return (
        <section id={styles['foreign-profile']}>
            {!isLoading && <div className={styles['user-ctn']}>
                <div className={styles['joined-ctn']}>
                    <div>
                        <p className={styles['causes-count']}>{userJoinedCauses?.length}</p>
                        <p className={styles['causes-text']}>Joined Causes</p>
                    </div>
                    <div>
                        <p className={styles['causes-count']}>{foreignUserCauses?.length}</p>
                        <p className={styles['causes-text']}>Causes</p>
                    </div>
                </div>
                <div className={styles['center']}>
                    <div className={styles['img-ctn']}>
                        <img
                            src={profilePicture}
                            className={styles['img']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            alt="profileImg"
                        >
                        </img>
                    </div>
                </div>
                <div className={styles['user-info']}>
                    <h1 className={styles['user-names']}>
                        {userInfo?.firstName} {userInfo?.lastName}
                    </h1>
                    <p className={styles['user-country']}>{userInfo?.country}</p>
                </div>

                {!isClicked && <div className={styles['btn-ctn']}>
                    <button onClick={() => setIsClicked(true)}
                        className={styles['btn']}
                        type="button"
                    >
                        User Causes
                    </button>
                </div>
                }
            </div>}
            {isClicked &&
                <div className={styles['causes-ctn']}>
                    {isLoading
                        ? (<Spinner />)
                        : foreignUserCauses.length !== 0
                            ? (foreignUserCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                            : (<h3 className="no-articles">No Created Causes yet</h3>)
                    }
                </div>
            }
        </section>

    )
}
