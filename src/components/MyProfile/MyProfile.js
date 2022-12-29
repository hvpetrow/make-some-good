import styles from './MyProfile.module.css';

import { collection } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../contexts/AuthContext"
import { useCausesContext } from "../../contexts/CauseContext";
import { db } from "../../firebase";
import { getOne } from "../../services/crudService";

const usersCollectionRef = collection(db, 'users');

export const MyProfile = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        city: '',
        country: ''
    });

    const [currentUserCauses, setCurrentUserCauses] = useState();
    const [currentUserJoinedCauses, setCurrentUserJoinedCauses] = useState();
    const [photo, setPhoto] = useState(null);
    const [active, setActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser, uploadProfilePicture, photoURL, setPhotoURL } = useAuth();
    const { filterCurrentUserCauses, filterUserJoinedCauses } = useCausesContext();

    useEffect(() => {
        getOne(usersCollectionRef, currentUser.uid)
            .then(docSnap => {
                setUserInfo(docSnap.data());
            }).catch(err => {
                console.log(err);
            });

        setCurrentUserCauses(filterCurrentUserCauses());
        setCurrentUserJoinedCauses(filterUserJoinedCauses(currentUser.uid));
    }, [currentUser.uid]);

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }

    }, [currentUser.photoURL, photoURL, currentUser])

    function refreshPage() {
        window.location.reload();
    }

    const browseHandler = (e) => {
        if (e.target.files[0]?.size > 1048576) {
            alert("File is too big");
            setActive(true);
        } else if (e.target.files[0]?.size === 0) {
            alert("No uploaded file");
            setActive(true)
        }
        else {
            setPhoto(e.target.files[0]);
            setActive(false);
        }
    }

    const submitHandler = async () => {
        try {
            setIsLoading(true)
            await uploadProfilePicture(photo, currentUser);
            toast.success('Successfully uploaded profile picture!');

        } catch (error) {
            return setError('Uploding file failed');
        }

        setIsLoading(false);
        console.log(currentUser + "submitted profile picture ");
        refreshPage();
    }

    console.log(currentUserCauses);
    console.log(currentUserJoinedCauses);

    return (
        <section id={styles['my-profile']}>
            <div className={styles['content-ctn']}>
                <div className={styles['causes-ctn']}>
                    <div>
                        <p className={styles['causes-count']}>{currentUserCauses?.length}</p>
                        <p className={styles['causes-title']}>My Causes</p>
                    </div>
                    <div>
                        <p className={styles['causes-count']}>{currentUserJoinedCauses?.length}</p>
                        <p className={styles['causes-title']}>Joined Causes</p>
                    </div>
                </div>
                <div className={styles['center']}>
                    <div className={styles['img-ctn']}>
                        <img
                            src={photoURL}
                            className={styles['img']}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            alt="profileImg"
                        >
                        </img>
                    </div>
                </div>
                <div className={styles['upload-ctn']}>
                    <div>
                        <label
                            className={styles['upload-label']}
                            htmlFor="file_input"
                        >
                            Upload file
                        </label>
                        <input
                            className={styles['upload-input']}
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={browseHandler}
                        />
                        <p
                            className={styles['upload-desc']}
                            id="file_input_help"
                        >
                            PNG,JPG (MAX. 1MB and 800x600)
                        </p>
                    </div>
                    <button to="/" disabled={active || isLoading} onClick={submitHandler} className={styles['upload-btn']}>
                        Upload Profile Picture
                    </button>
                </div>
            </div>
            <Link to="/change-password" className={styles['change-password-btn']}>
                Change Your Password
            </Link>
            <div className={styles['user-info']}>
                <h1 className={styles['user-names']}>
                    {userInfo?.firstName} {userInfo?.lastName}
                </h1>
                <p className={styles['user-country']}>{userInfo?.country}</p>
                <p className={styles['user-addInfo']}>University of Computer Science</p>
            </div>
        </section>
    )
}
