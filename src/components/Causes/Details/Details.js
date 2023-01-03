import styles from './Details.module.css'

import { arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import yesno from "yesno-dialog"

import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { getOneCause } from '../../../services/causesService'
import { getOne } from '../../../services/crudService';

const usersCollectionRef = collection(db, 'users');

export const Details = () => {
    const [cause, setCause] = useState('');
    const [creator, setCreator] = useState('');
    const [docId, setDocId] = useState(null);
    const [profilePicture, setProfilePicture] = useState("https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png");
    const [isParticipant, setIsParticipant] = useState(false);
    const { currentUser, getProfilePicture } = useAuth();
    const { causeId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            getOneCause(causeId)
                .then(doc => {
                    setCause(doc.data());
                    setDocId(doc.id);
                });
        } catch (error) {
            console.log(error);
        }
    }, [causeId, cause.creator]);

    useEffect(() => {
        if (cause?.creator) {
            const promises = [getProfilePicture(cause.creator), getOne(usersCollectionRef, cause.creator)];

            Promise.all(promises)
                .then(([url, userDoc]) => {
                    setCreator(userDoc.data());
                    setProfilePicture(url);
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setIsLoading(false);
                })
        }
    }, [cause.creator]);
    // useEffect(() => {
    //     try {
    //         getOneCause(causeId)
    //             .then(doc => {
    //                 setCause(doc.data());
    //                 setDocId(doc.id);
    //             });

    //         if (cause.creator) {
    //             getOne(usersCollectionRef, cause.creator)
    //                 .then(doc => {
    //                     setCreator(doc.data());
    //                 });
    //         }

    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [causeId, cause.creator]);

    // useEffect(() => {
    //     if (cause?.participants?.length > 0) {
    //         const foundedParticipant = cause.participants.find(c => currentUser.uid === c);
    //         if (foundedParticipant) {
    //             setIsParticipant(true);
    //         }
    //     }

    // }, [cause.participants]);


    // useEffect(() => {
    //     if (cause?.creator) {

    //         getProfilePicture(cause.creator)
    //             .then(url => setProfilePicture(url))
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     }
    // }, [cause.creator])



    const joinHandler = async () => {
        const currentCauseRef = doc(db, "causes", docId);

        try {
            await updateDoc(currentCauseRef, {
                participants: arrayUnion(currentUser.uid)
            });
            toast.success('Successfully Joined Cause!');
            setIsParticipant(true);
            //TODO: is Participant logic update

        } catch (error) {
            console.log(error);
        }
    }

    const cancelCauseHandler = async () => {
        const currentCauseRef = doc(db, "causes", docId);

        try {
            await updateDoc(currentCauseRef, {
                participants: arrayRemove(currentUser.uid)
            });
            toast.success('Successfully Canceled Cause!');
            setIsParticipant(false);

        } catch (error) {
            console.log(error);
        }
    }

    const removeHandler = async () => {
        const yes = await yesno({ bodyText: "Are you sure to delete this cause?" });
        if (yes) {
            navigate(`/delete/${causeId}`);
        }
    }

    console.log(cause);
    console.log(creator);

    return (
        <>
            {!isLoading && <div>
                <div className={styles['details-card-container']}>
                    <div className={styles['details-grid']}>
                        <div className={styles['details-img-container']}>
                            <img
                                className={styles['details-img']}
                                src={cause.imgUrl}
                                alt="causeImg"
                            />
                        </div>
                        <div className={styles['details-content-container']}>
                            <p className={styles['content-elem']}>
                                <span className={styles['content-title']}>
                                    Title:
                                </span>
                                <span>{cause.title}</span>
                            </p>
                            <p className={styles['content-elem']}>
                                <span className={styles['content-title']}>
                                    Date:
                                </span>
                                <span>{cause.date}</span>
                            </p>
                            <p className={styles['content-elem']}>
                                <span className={styles['content-title']}>
                                    Place:
                                </span>
                                <span>{cause.place}</span>
                            </p>
                            <div className={`${styles['content-elem']} ${styles['content-elem-creator']}`}>
                                <p className="flex items-center">
                                    <span className={styles['content-title']}>
                                        Creator:
                                    </span>
                                </p>
                                <Link className={styles['content-profile-link']} to={`/foreignProfile/${cause.creator}`}>{creator?.firstName} {creator.lastName}</Link>
                                <Link className={styles['content-profile-link']} to={`/foreignProfile/${cause.creator}`}>
                                    <img src={profilePicture} className={styles['creator-img']} alt="profileImg"></img>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center flex-col border rounded-lg overflow-hidden bg-white my-12 max-w-lg">
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col">
                            <div className="flex flex-col space-y-4  p-6 text-gray-600">
                                <div className="flex flex-row text-sm">
                                    <p className="flex items-center text-gray-500">
                                        {cause.description}
                                    </p>
                                </div>
                            </div>
                            {currentUser?.uid &&
                                <div className="flex flex-col w-full relative bottom-0">
                                    <div className="grid grid-cols-3 border-t divide-x text-[#64748b] bg-gray-50 dark:bg-transparent py-3">
                                        {currentUser.uid === cause.creator &&
                                            <>
                                                <Link to={`/edit/${causeId}`} className="text-[#079c9a] cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                                                    <div className="mr-2 ">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            width="20px"
                                                            fill="#079c9a"
                                                        >
                                                            <path d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                        </svg>
                                                    </div>
                                                    Update
                                                </ Link>
                                                <button onClick={removeHandler} className="text-[#D2042D] cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                                                    <div className="mr-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            width="20px"
                                                            fill="#D2042D"
                                                        >
                                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                                                        </svg>
                                                    </div>
                                                    Remove
                                                </button>
                                            </>
                                        }
                                        {!isParticipant
                                            ? <button onClick={joinHandler} className="text-[#9c428c] cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                                                <div className="mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="20px"
                                                        viewBox="0 0 24 24"
                                                        width="20px"
                                                        fill="#9c428c"
                                                    >
                                                        <path d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                                    </svg>
                                                </div>
                                                Join
                                            </button>
                                            : <button onClick={cancelCauseHandler} className="text-[#ada02b] cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                                                <div className="mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="20px"
                                                        viewBox="0 0 24 24"
                                                        width="20px"
                                                        fill="#ada02b"
                                                    >
                                                        <path d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                                    </svg>
                                                </div>
                                                Cancel Cause
                                            </button>
                                        }

                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
            }
        </>

    )
}
