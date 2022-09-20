import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CreateCause = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        title: '',
        purpose: '',
        place: '',
        date: '',
        description: ''
    });

    const [error, setError] = useState('');


    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    return (

        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap scale-90  h-full g-6 text-gray-800">

                    <div className="max-w-md  md:w-1/12 lg:w-5/12 lg:ml-20">
                        <h2 className="text-center text-4xl mb-12">Create Cause</h2>
                        {/* {currentUser && currentUser.email} */}

                        {/* {error} */}
                        <form >
                            {/* Email input */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Title"
                                    required
                                    value={values.title}
                                    onChange={changeHandler}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="purpose"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Purpose"
                                    required
                                    value={values.purpose}
                                    onChange={changeHandler}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="place"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Place"
                                    required
                                    value={values.place}
                                    onChange={changeHandler}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="date"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Date"
                                    required
                                    value={values.date}
                                    onChange={changeHandler}

                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="imgUrl"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="example: https://pixlr.eu/makeSomeGood.png"
                                    required
                                    value={values.date}
                                    onChange={changeHandler}

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
                                        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                        id="description"
                                        defaultValue={""}
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
                            >
                                Create
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
