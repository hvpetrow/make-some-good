import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'

export const ChangePassword = () => {
    const [values, setValues] = useState({
        newPassword: '',
        repass: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { logout, updatePasswordForCurrentUser, currentUser } = useAuth();

    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (values.newPassword !== values.repass) {
           return setError('Passwords do not match');
        }

        console.log(values);

        setIsLoading(true);
        
        // const promises = [];
        
        // if (values.email !== currentUser.email) {
        //     promises.push(updateEmailForCurrentUser(values.email));
        // }

        if (values.newPassword && values.repass) {
            try {
                await updatePasswordForCurrentUser(values.newPassword);
                await logout();
                navigate('/login');
            } catch (error) {
                console.log(error);
                    setError(setError(error.msg));
            }

            setIsLoading(false);
        }




        // console.log(promises);
        // Promise.all(promises).then(() => {
        //     navigate('/');
        // }).catch((err) => {
        //     console.log(err);
        //     setError(setError(err.msg));
        // }).finally(() => {
        //     setIsLoading(false);
        // });

    }

    return (

        <section className="h-screen">
            <div className="container px-6 py-12 -my-8 h-full">
                <div className="flex justify-center items-center flex-wrap  h-full g-6 text-gray-800">
                    <div className="scale-75 md:w-8/12 lg:w-6/12 mb-14 md:mb-0">
                        <img
                            src={require("../../assets/settings.jpg")}
                            className="w-full "
                            alt="settingsImg"
                        />
                    </div>
                    <div className="max-w-md  md:w-1/12 lg:w-5/12 lg:ml-20">
                        <h2 className="flex justify-center font-bold text-4xl my-8 mx-4">Change Password</h2>
                        {/* {error} */}
                        <form onSubmit={submitHandler}>
                            {/* Password input */}
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="newPassword"
                                    required
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Your new password"
                                    value={values.newPassword}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="repass"
                                    required
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Repeat your new password"
                                    value={values.repass}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="show_info text-sm mb-4 w-max text-red-400" >
                                <p>{error}</p>
                            </div>

                            {/* Submit button */}
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Update
                            </button>
                            <div className="flex py-5 justify-center items-center mb-6">
                                <Link
                                    to="/my-profile"
                                    className="text-blue-600 hover:text-blue-800 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


