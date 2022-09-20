import { updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase';

export const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
        repass: '',
        firstName: '',
        lastName: ''
    });

    const [error, setError] = useState('');

    const [tac, setTac] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { signUp, currentUser,setUserAdditionalInfo } = useAuth();
    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    const tacChangeHandler = (e) => {
        setTac(e.target.checked);
    }



    const submitHandler = async (e) => {
        e.preventDefault();

        if (values.password !== values.repass) {
            setError('Passwords do not match')
            return;
        }

        if (!tac) {
            setError('You must agree with terms and conditions')
            return;
        }

         try {
            setIsLoading(true);
            const { user } = await signUp(values.email, values.password);

            const additionalUserData = {
                firstName: values.firstName,
                lastName: values.lastName
            }

            const settedUserWithAdditionalData = await  setUserAdditionalInfo(additionalUserData,user.uid)
            // await updateProfile(user, {
                //     displayName: values.displayName,
                // });

            navigate('/');
        } catch (error) {
            setError('Failed to create an account');
         }

         setIsLoading(false);
    }

    return (

        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap  h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src={require("../../assets/register.jpg")}
                            className="scale-75 mb-4"
                            alt="registerImg"
                        />
                    </div>
                    <div className="max-w-md  md:w-1/12 lg:w-5/12 lg:ml-20">
                        <h2 className=" text-3xl mb-6">Sign Up</h2>
                        {currentUser && currentUser.email}

                        {/* {error} */}
                        <form onSubmit={submitHandler}>
                            {/* Email input */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    required
                                    value={values.email}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="First Name"
                                    required
                                    value={values.displayName}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Last Name"
                                    required
                                    value={values.displayName}
                                    onChange={changeHandler}
                                />
                            </div>
                            {/* Password input */}
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    required
                                    value={values.password}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="repass"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Confirm password"
                                    required
                                    value={values.repass}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="show_info text-sm mb-4 w-max text-red-400" >
                                <p>{error}</p>
                            </div>
                            <div className="flex my-3 items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                        value={tac}
                                        onChange={tacChangeHandler}
                                    />
                                </div>
                                <div className=" ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-800 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <Link
                                            className="font-medium text-primary-600 hover:underline hover:text-blue-800 dark:text-primary-500"
                                            to="#"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </label>
                                </div>
                            </div>


                            {/* Submit button */}
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Sign up
                            </button>
                            <div className="flex py-5 justify-center items-center mb-6">
                                <p className=" text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:text-blue-800 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


