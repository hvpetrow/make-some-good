import styles from './Login.module.css';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const { logIn, currentUser } = useAuth();

    const [error, setError] = useState('');
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

        if (values.email === '' || values.password === '') {
            return;
        }

        try {
            setIsLoading(true);
            await logIn(values.email, values.password);
            toast.success('Successfully Login!');

            navigate('/');
        } catch (error) {
            setError('Failed to sign in');
            toast.error('Wrong email or password');
        }

        setIsLoading(false);
    }

    return (
        <section className={styles['login']}>
            <div className="container -my-2 px-6 py-10 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full scale-110"
                            alt="loginImg"
                        />
                    </div>
                    <div className="max-w-md  md:w-8/12 lg:w-5/12 lg:ml-20">
                        <h2 className="text-center font-bold text-4xl mb-16 mx-4">Login</h2>

                        <div className="login">
                            <form onSubmit={submitHandler} >
                                <label htmlFor="inputEmail" className="form-label text-xl my-2 mx-2 inline-block mb-2 text-gray-700">Email address</label>
                                <div className="username flex border rounded text-gray-500 mb-4">
                                    <input
                                        name="email"
                                        className="outline-none px-2 h-full py-2 text-lg"
                                        type="text"
                                        placeholder="user@gmail.com"
                                        required
                                        id="inputEmail"
                                        value={values.email}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <label htmlFor="inputPassword" className="form-label text-xl my-2 mx-2 inline-block mb-2 text-gray-700">Password</label>
                                <div className="password flex border rounded text-gray-500 mb-4">
                                    <input
                                        name="password"
                                        className="outline-none px-2 h-full py-2 text-lg"
                                        type="password"
                                        placeholder="******"
                                        required
                                        id="inputPassword"
                                        value={values.password}
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
                                        Log In
                                    </button>
                                </div>
                                <div className="flex justify-center -mt-1 mb-7">
                                    <Link
                                        to="/forgot-password"
                                        className="text-blue-600 hover:text-blue-800 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >
                                        Forgot Password?
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