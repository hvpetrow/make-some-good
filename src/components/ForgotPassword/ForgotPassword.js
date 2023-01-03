import styles from './ForgotPassword.module.css';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const ForgotPassword = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
    });

    const { resetPassword, currentUser } = useAuth();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log(values);

        try {
            setIsLoading(true);
            await resetPassword(values.email);
            setMessage("Check your inbox for further instructions");
        } catch (error) {
            setError('Failed to reset');
        }

        setIsLoading(false);
    }

    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">

                    <div className="max-w-md -mt-16  md:w-8/12 lg:w-5/12 lg:ml-20">
                        <h2 className="flex justify-center font-bold text-4xl mb-16 mx-4">Password Reset</h2>

                        <div className="login">
                            <form onSubmit={submitHandler} >
                                <label htmlFor="inputEmail" className="form-label mt-4 mx-2 inline-block mb-2 text-gray-700">Email address</label>
                                <div className="username flex border rounded text-gray-500 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 mx-2 my-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <input
                                        name="email"
                                        className="outline-none px-2 h-full py-2 text-lg"
                                        type="text"
                                        placeholder="Enter email"
                                        id="inputEmail"
                                        value={values.email}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="show_info text-sm mb-4 w-max text-red-400" >
                                    <p>Here is the Error</p>
                                </div>
                                <div className="submit border rounded mb-4 bg-blue-600 text-white cursor-pointer">
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <div className="flex justify-center -mt-1 mb-7">
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:text-blue-800 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >
                                        Login
                                    </Link>
                                </div>
                                <p className="flex justify-center text-gray-500 dark:text-gray-400">
                                    Need an account?&nbsp;
                                    <Link
                                        to="/register"
                                        className="text-blue-600 hover:text-blue-800 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
