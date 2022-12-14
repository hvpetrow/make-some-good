import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from '../../../firebase';
import { getOneCause } from '../../../services/causesService';

export const EditCause = () => {
    const { causeId } = useParams();
    const navigate = useNavigate();

    const [cause, setCause] = useState('');
    const [docId, setDocId] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            getOneCause(causeId)
                .then(doc => {
                    setDocId(doc.id);
                    setCause(doc.data());
                });

        } catch (error) {
            console.log(error);
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        const editedCause = Object.fromEntries(new FormData(e.target));

        console.log(editedCause);

        try {
            const currentCauseRef = doc(db, "causes", docId);
            setIsLoading(true);
            await updateDoc(currentCauseRef, editedCause);

            toast.success('Successfully Updated Cause!');
            navigate(`/details/${causeId}`);
        } catch (error) {
            console.log(error);
            setError('Failed to updated');
        }

        setIsLoading(false);
    }

    return (

        <section className="h-screen">
            <div className="container px-4 py-8 h-5/6">
                <div className="flex justify-center items-center flex-wrap scale-90  h-5/6 g-6 text-gray-800">
                    <div className="max-w-xl md:w-2/3 lg:w-3/4 lg:ml-20">
                        <h2 className="text-center text-4xl mb-12">Update Cause</h2>
                        {/* {currentUser && currentUser.email} */}

                        {/* {error} */}
                        <form onSubmit={submitHandler}>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Title"
                                    required
                                    defaultValue={cause.title}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="purpose"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Purpose"
                                    required
                                    defaultValue={cause.purpose}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="place"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Place"
                                    required
                                    defaultValue={cause.place}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="date"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Date"
                                    required
                                    defaultValue={cause.date}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="imgUrl"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Example: https://pixlr.eu/makeSomeGood.png"
                                    required
                                    defaultValue={cause.imgUrl}
                                />
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className=" no-resize appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        defaultValue={cause.description}
                                    />
                                </div>
                            </div>

                            <div className="show_info text-sm mb-4 w-max text-red-400" >
                                {/* <p>{error}</p> */}
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                disabled={isLoading}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
