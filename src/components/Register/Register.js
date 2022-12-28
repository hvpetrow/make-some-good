import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './Register.module.css';

import { useAuth } from '../../contexts/AuthContext'
import userValidation from '../../validation/userValidation';

export const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [hasTouched, setHasTouched] = useState({
        email: false,
        password: false,
        repass: false,
        firstName: false,
        lastName: false,
        country: false,
        terms: false
    });

    const [values, setValues] = useState({
        email: '',
        password: '',
        repass: '',
        firstName: '',
        lastName: '',
        country: ''
    });

    const [tac, setTac] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, currentUser, setUserAdditionalInfo } = useAuth();

    const showPasswordHandler = () => {
        setShowPassword(state => !state);
    };

    const showRepeatPasswordHandler = () => {
        setShowRepeatPassword(state => !state);
    };

    const emailValidator = (e) => {
        setHasTouched((state) => ({
            ...state,
            [e.target.name]: true
        }));

        setErrors((state) => ({
            ...state,
            [e.target.name]: userValidation.emailIsValid(values[e.target.name])
        }));
    };

    const nameValidator = (e) => {
        setHasTouched((state) => ({
            ...state,
            [e.target.name]: true
        }));

        setErrors((state) => ({
            ...state,
            [e.target.name]: userValidation.nameIsLength(values[e.target.name])
        }));
    };

    const passwordValidator = (e) => {
        setHasTouched((state) => ({
            ...state,
            [e.target.name]: true
        }));

        setErrors((state) => ({
            ...state,
            [e.target.name]: userValidation.passwordIsLength(values[e.target.name])
        }));
    };

    const rePassValidator = (e) => {
        setHasTouched((state) => ({
            ...state,
            [e.target.name]: true
        }));

        setErrors((state) => ({
            ...state,
            [e.target.name]: userValidation.isEqual(values.password, values[e.target.name])
        }));
    };

    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    const tacChangeHandler = (e) => {
        setTac(e.target.checked);
        setErrors((state) => ({
            ...state,
            [e.target.name]: e.target.checked
        }));
    }



    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== repass) {
            setErrors((state) => ({
                ...state,
                repass: false
            }))

            return;
        }

        if (!isFormValid) {
            toast.error('Failed to create an account');
            return;
        }

        try {
            setIsLoading(true);
            const { user } = await signUp(values.email, values.password);
            const additionalUserData = {
                firstName: values.firstName,
                lastName: values.lastName,
                country: values.country
            }

            const settedUserWithAdditionalData = await setUserAdditionalInfo(additionalUserData, user.uid)
            toast.success('Successfully Registered!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to create an account');
        }

        setIsLoading(false);
    }

    const { email, firstName, lastName, country, password, repass } = hasTouched;

    let required;
    if (email && firstName && lastName && country && password && repass) {
        required = true;
    }

    const isFormValid = required && tac && Object.values(errors).every(x => x === true);
    console.log(errors);
    console.log(required);
    return (

        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 scale-95 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src={require("../../assets/register.jpg")}
                            className="mb-24"
                            alt="registerImg"
                        />
                    </div>
                    <div className="max-w-md  md:w-1/12 lg:w-5/12 lg:ml-20">
                        <h2 className="text-4xl mb-16 font-bold text-center">Sign Up</h2>
                        {currentUser && currentUser.email}

                        {/* {error} */}
                        <form onSubmit={submitHandler}>
                            {/* Email input */}
                            <div className="mb-6 ">
                                <label htmlFor="email" className='text-xl'>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="user@gmail.com"
                                    required
                                    value={values.email}
                                    onChange={changeHandler}
                                    onBlur={(e) => emailValidator(e)}
                                />

                                {(!errors.email && hasTouched.email) && (
                                    <p className=" flex items-center font-medium tracking-wide text-red-500  mt-1 ml-1 ">Email is not valid!!</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="firstName" className='mb-10 text-xl'>First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Max"
                                    required
                                    value={values.displayName}
                                    onChange={changeHandler}
                                    onBlur={(e) => nameValidator(e)}
                                />

                                {(!errors.firstName && hasTouched.firstName) && (
                                    <p className=" flex items-center font-medium tracking-wide text-red-500  mt-1 ml-1 ">First Name must be at least 2 characters long!!</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className='mb-10 text-xl'>Last Name:</label>

                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Mustermann"
                                    required
                                    value={values.displayName}
                                    onChange={changeHandler}
                                    onBlur={(e) => nameValidator(e)}
                                />
                                {(!errors.lastName && hasTouched.lastName) && (
                                    <p className=" flex items-center font-medium tracking-wide text-red-500  mt-1 ml-1 ">Last Name must be at least 2 characters long!!</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="country" className='mb-10 text-xl'>Country:</label>

                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Germany"
                                    required
                                    value={values.country}
                                    onChange={changeHandler}
                                    onBlur={(e) => nameValidator(e)}
                                />
                                {(!errors.country && hasTouched.country) && (
                                    <p className=" flex items-center font-medium tracking-wide text-red-500  mt-1 ml-1 ">Country is not valid!!</p>
                                )}
                            </div>
                            {/* Password input */}
                            <div className="mb-2">
                                <label htmlFor="password" className='mb-10 text-xl'>Password:</label>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="******"
                                    required
                                    value={values.password}
                                    onChange={changeHandler}
                                    onBlur={(e) => passwordValidator(e)}
                                />
                                <span className={styles['password-icon']} onClick={showPasswordHandler}>
                                    {showPassword
                                        ? <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </span>
                                {(!errors.password && hasTouched.password) && (
                                    <p className=" flex items-center font-medium tracking-wide text-red-500  mt-1 ml-1 ">Password must be at least 6 characters long!!</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="repass" className='mb-10 text-xl'>Repeat Password:</label>
                                <input
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    name="repass"
                                    id="repass"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="******"
                                    required
                                    value={values.repass}
                                    onChange={changeHandler}
                                    onBlur={(e) => rePassValidator(e)}
                                />

                                <span className={styles['password-icon']} onClick={showRepeatPasswordHandler}>
                                    {showRepeatPassword
                                        ? <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </span>
                                {(!errors.repass && hasTouched.repass) && (
                                    <p className=" flex items-center font-medium tracking-wide text-red-500  mt-1 ml-1 ">Passwords do not match!!</p>
                                )}
                            </div>

                            <div className="flex my-3 items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        name="terms"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                        value={tac}
                                        onChange={tacChangeHandler}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
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
                                disabled={isLoading || !isFormValid}
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


