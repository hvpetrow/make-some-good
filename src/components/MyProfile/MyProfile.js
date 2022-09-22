import { collection } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../contexts/AuthContext"
import { db } from "../../firebase";
import { getOne } from "../../services/crudService";

const usersCollectionRef = collection(db, 'users');

export const MyProfile = () => {
    const [userInfo,setUserInfo] = useState({
        firstName:'',
        lastName:'',
        city:'',
        country:''
    });

    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentUser, uploadProfilePicture, photoURL, setPhotoURL } = useAuth();

    useEffect(() => {
        getOne(usersCollectionRef,currentUser.uid)
        .then(docSnap => {
            console.log(docSnap.data());

            setUserInfo(docSnap.data());
        });
    },[currentUser.uid]) ;

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }

    }, [currentUser.photoURL, photoURL,currentUser])

    function refreshPage() {
        window.location.reload();
    }

    const browseHandler = (e) => {
        setPhoto(e.target.files[0]);
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
                                src={photoURL}
                                className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                alt="profile"
                            >
                            </img>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="file_input"
                            >
                                Upload file
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="file_input_help"
                                id="file_input"
                                type="file"
                                onChange={browseHandler}
                            />
                            <p
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="file_input_help"
                            >
                                SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p>
                        </div>

                        <button to="/" disabled={isLoading || !photo} onClick={submitHandler} className="text-white py-4 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-sm transition transform hover:-translate-y-0.5">
                            {" "}
                            Upload Profile Picture
                        </button>{" "}

                    </div>
                </div>{" "}
                <Link to="/change-password" className="mx-20 my-20 text-white py-4 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-sm transition transform hover:-translate-y-0.5">
                    {" "}
                    Change Your Password
                </Link>{" "}
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