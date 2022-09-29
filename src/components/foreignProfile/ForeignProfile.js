import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import { useCausesContext } from '../../contexts/CauseContext';
import { db } from '../../firebase';
import { getOne } from '../../services/crudService';
import { Spinner } from '../../shared/Spinner';
import { CardTemplate } from '../Home/CardTemplate';

const usersCollectionRef = collection(db, 'users');

export const ForeignProfile = () => {
    const [userInfo, setUserInfo] = useState('');
    const [profilePicture, setProfilePicture] = useState("https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png");
    const { getProfilePicture } = useAuth();
    const { filterForeignUserCauses,filterUserJoinedCauses } = useCausesContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [foreignUserCauses, setForeignUserCauses] = useState([]);
    const [userJoinedCauses,setUserJoinedCauses] = useState([]);


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
            {!isLoading && <div className="p-8 bg-white shadow mt-24">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-1">
                    {" "}
                    <div className="grid grid-cols-2 -mx-16 text-center order-last md:order-first mt-20 md:mt-0">
                        {" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">{userJoinedCauses.length}</p>{" "}
                            <p className="text-gray-400">Joined Causes</p>{" "}
                        </div>{" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">{foreignUserCauses.length}</p>{" "}
                            <p className="text-gray-400">My Causes</p>{" "}
                        </div>{" "}

                    </div>{" "}
                    <div className="relative ">
                        {" "}
                        <div className="absolute inset-x-0 top-0 -mt-36  flex items-center justify-center ">
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

                </div>{" "}
                {!isClicked &&
                <div className="mt-12 flex justify-center">
    
                    <button onClick={() => setIsClicked(true)}
                        className="bg-pink-500 active:bg-pink-600 w-48 md:w-64 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                    >
                        User Causes
                    </button>
                </div>
}
            </div>}
            {isClicked &&
                 <div className=" flex justify-center my-7 ">
                    <div className="grid py-10 justify-center my-7  -space-x-15 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-14">
                        {isLoading
                            ? (<Spinner />)
                            : foreignUserCauses.length !== 0
                                ? (foreignUserCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                                : (<h3 className="no-articles">No Created Causes yet</h3>)
                        }
                    </div>
                </div>
            }
        </div>

    )
}
