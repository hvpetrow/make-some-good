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
import { Spinner } from '../../../shared/Spinner';
import CommentBox from './CommentBox';
import { getCommentsByCauseId } from '../../../services/commentsService';

const usersCollectionRef = collection(db, 'users');

export const Details = () => {
    const [cause, setCause] = useState('');
    const [comments, setComments] = useState('');
    const [creator, setCreator] = useState('');
    const [docId, setDocId] = useState(null);
    const [isParticipant, setIsParticipant] = useState(false);
    const [profilePicture, setProfilePicture] = useState("https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png");
    const { currentUser, getProfilePicture } = useAuth();
    const { causeId } = useParams();
    const navigate = useNavigate();
    const [isShowedComments, setIsShowedComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        document.title = 'Details | Make Some Good';

        try {
            getOneCause(causeId)
                .then(doc => {
                    setCause(doc.data());
                    setDocId(doc.id);
                }).then(() => {
                    setIsParticipant(cause?.participants?.some(participant => participant === currentUser.uid));
                });
        } catch (error) {
            console.log(error);
        }
    }, [causeId, cause.creator, isParticipant]);

    useEffect(() => {
        if (cause?.creator) {
            const promises = [getProfilePicture(cause.creator), getOne(usersCollectionRef, cause.creator), getCommentsByCauseId(causeId)];

            Promise.all(promises)
                .then(([url, userDoc, commentsDocs]) => {
                    setCreator(userDoc.data());
                    setProfilePicture(url);
                    storeComments(commentsDocs);
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setIsLoading(false);
                })
        }
    }, [cause.creator]);

    const storeComments = (commentsDocs) => {
        let arr = [];
        commentsDocs.forEach((doc) => {
            let fields = doc.data();

            arr.push({
                id: doc.id,
                fields: fields
            });
        });

        setComments(arr);
    }

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

    const toggleComments = () => {
        setIsShowedComments(state => !state);
    }

    return (
        <>
            <section id={styles['details']}>
                {!isLoading && <div className={styles['details-ctn']}>
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
                                        <span className={`${styles['content-title']} ${styles['padding-top1']}`}>
                                            Creator:
                                        </span>
                                    </p>
                                    <Link className={styles['content-profile-link']} to={cause.creator === currentUser.uid ? `/my-profile` : `/foreignProfile/${cause.creator}`}>{creator?.firstName} {creator.lastName}</Link>
                                    <Link className={styles['content-profile-link']} to={cause.creator === currentUser.uid ? `/my-profile` : `/foreignProfile/${cause.creator}`}>
                                        <img src={profilePicture} className={styles['creator-img']} alt="profileImg"></img>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['down-part-ctn']}>
                        <p className={styles['description']}>
                            {cause.description}
                        </p>
                        {currentUser?.uid &&
                            <div className={styles['btns-ctn']}>
                                {currentUser.uid === cause.creator &&
                                    <>
                                        <button onClick={removeHandler} className={`${styles['remove-btn']} ${styles['btn']}`} >
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
                                        <Link to={`/edit/${causeId}`} className={`${styles['update-btn']} ${styles['btn']}`}>
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
                                    </>
                                }
                                {currentUser.uid !== cause.creator &&
                                    !isParticipant ?
                                    (< button onClick={joinHandler} className={`${styles['join-btn']} ${styles['btn']}`}>
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
                                    </button>)
                                    : <button onClick={cancelCauseHandler} className={`${styles['cancel-btn']} ${styles['btn']}`}>
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
                        }
                    </div>
                </div>
                }
                {isLoading && (<Spinner />)}
            </section >
            <button onClick={toggleComments} className={styles['comments_btn']}>
                <span> Comments(count)</span>
            </button>
            <CommentBox comments={comments} isShowedComments={isShowedComments} />
        </>
    )
}
