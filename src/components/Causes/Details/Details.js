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
        // const confirmation = window.confirm('Are you sure to delete this cause?');
        const yes = await yesno({ bodyText: "Are you sure to delete this cause?" });
        if (yes) {
            navigate(`/delete/${causeId}`);
        }
    }

    return (
        <>
            {/* This is an example component */}
            {!isLoading && <div>
                <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-4">
                        <div className="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
                            <img
                                className="rounded-lg"
                                src={cause.imgUrl}
                                alt="causeImg"
                            />
                        </div>
                        <div className="flex flex-col sm:border-l col-span-3">
                            <div className="flex flex-col space-y-4  p-6 text-gray-600">
                                <div className="flex flex-row text-sm">
                                    <span className="mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            enableBackground="new 0 0 24 24"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            width="20px"
                                            fill="#64748b"
                                        >
                                            <g>
                                                <rect fill="none" height={24} width={24} />
                                            </g>
                                            <g>
                                                <path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                                            </g>
                                        </svg>
                                    </span>
                                    <p className="flex items-center  text-gray-500">
                                        <span className="font-semibold mr-2 text-xs uppercase">
                                            Title:
                                        </span>
                                        <span>{cause.title}</span>
                                    </p>
                                </div>
                                <div className="flex flex-row text-sm">
                                    <span className="mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            width="20px"
                                            fill="#64748b"
                                        >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                                        </svg>
                                    </span>
                                    <p className="flex items-center  text-gray-500">
                                        <span className="font-semibold mr-2 text-xs uppercase">
                                            Date:
                                        </span>
                                        <span>{cause.date}</span>
                                    </p>
                                </div>
                                <div className="flex flex-row text-sm">
                                    <p className="flex items-center  text-gray-500">
                                        <span className="font-semibold mr-2 text-xs uppercase">
                                            Place:
                                        </span>
                                        <span>{cause.place}</span>
                                    </p>
                                </div>
                                <div className="flex flex-row text-sm">
                                    <div>
                                        <p className="flex items-center  text-gray-500">
                                            <Link to={`/foreignProfile/${cause.creator}`} className="hover:scale-105">
                                                <span className="font-semibold mr-2 text-xs uppercase ">
                                                    Creator:
                                                </span>
                                            </Link>
                                            <Link className='hover:text-blue-800 hover:underline hover:scale-105 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out' to={`/foreignProfile/${cause.creator}`}>{creator.firstName} {creator.lastName}</Link>
                                        </p>
                                    </div>
                                    <div className="mx-4">
                                        <Link to={`/foreignProfile/${cause.creator}`}>
                                            <img
                                                src={profilePicture}
                                                className="h-8 w-8 rounded-full bg-indigo-100 mx-auto shadow-2xl transition duration-500 hover:scale-150 "
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                alt="profile"
                                            >
                                            </img>
                                        </Link>
                                    </div>
                                </div>
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
