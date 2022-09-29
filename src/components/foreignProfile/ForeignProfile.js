import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { getOne } from '../../services/crudService';

const usersCollectionRef = collection(db, 'users');

export const ForeignProfile = () => {
    const [userInfo, setUserInfo] = useState('');
    const [profilePicture, setProfilePicture] = useState("https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png");
    const { getProfilePicture } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        const promises = [getProfilePicture(userId),getOne(usersCollectionRef, userId) ];

        Promise.all(promises)
            .then(([url, doc]) => {
                setProfilePicture(url)
                setUserInfo(doc.data());
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }, [userId]);


    // useEffect(() => {
    //     getOne(usersCollectionRef, userId)
    //         .then(doc => {
    //             setUserInfo(doc.data());
    //             setIsLoading(false);
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    // }, [userId]);

    // useEffect(() => {
    //     getProfilePicture(userId)
    //         .then(url => setProfilePicture(url))
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, [])

    console.log(userInfo);

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {" "}
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        {" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                            <p className="text-gray-400">Causes</p>{" "}
                        </div>{" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                            <p className="text-gray-400">My Causes</p>{" "}
                        </div>{" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">89</p>{" "}
                            <p className="text-gray-400">Rating</p>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="relative">
                        {" "}
                        <div className="absolute inset-x-0 top-0 -mt-24 flex items-center justify-center ">
                            <img
                                src={profilePicture}
                                className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                alt="profile"
                            >
                            </img>{" "}
                        </div>{" "}
                    </div>{" "}

                </div>{" "}

                <div className="mt-20 text-center border-b pb-12">
                    {" "}
                    <h1 className="text-4xl font-medium text-gray-700">
                        {userInfo.firstName} {userInfo.lastName}
                    </h1>{" "}
                    <p className="font-light text-gray-600 mt-3">{userInfo.country}</p>{" "}
                    <p className="mt-8 text-gray-500">
                        Solution Manager - Creative Tim Officer
                    </p>{" "}
                    <p className="mt-2 text-gray-500">University of Computer Science</p>
                </div>{" "}
                <div className="mt-12 flex flex-col justify-center">
                    <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                        {" "}
                        Show more
                    </button>
                </div>
            </div>
        </div>
    )
}
