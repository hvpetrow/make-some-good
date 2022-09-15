import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        repass: '',
    });

    const { logIn,currentUser } = useAuth();

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const submitHandler = async (e) => {
        e.preventDefault();

        console.log(values);

        try {
            setIsLoading(true);
            await logIn(values.email, values.password);
        } catch (error) {
            setError('Failed to sign in');
        }

        setIsLoading(false);
    }

    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>
                    <div className="max-w-md  md:w-8/12 lg:w-5/12 lg:ml-20">
                    <h2 className="flex justify-center font-bold text-4xl my-6 mx-4">Log In</h2>

                        <div className="login">
                            <form onSubmit={submitHandler} >
                                <label for="inputEmail" class="form-label my-2 mx-2 inline-block mb-2 text-gray-700">Email address</label>
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
                                        className="outline-none px-2 h-full py-2 text-lg"
                                        type="text"
                                        placeholder="Enter email"
                                        id="inputEmail"
                                    />
                                </div>
                                <label for="inputPassword" class="form-label my-2 mx-2 inline-block mb-2 text-gray-700">Password</label>
                                <div className="password flex border rounded text-gray-500 mb-4">

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
                                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                        />
                                    </svg>
                                    <input
                                        className="outline-none px-2 h-full py-2 text-lg"
                                        type="password"
                                        placeholder="Enter you password"
                                        id="inputPassword"
                                    />
                                </div>
                                <div className="show_info text-sm mb-4 w-max text-red-400" >
                                    <p>Here is the Error</p>
                                </div>
                                <div className="submit border rounded mb-4 bg-blue-600 text-white cursor-pointer">
                                    <div className="wrapper flex w-max mx-auto">
                                        <button

                                            type="submit"
                                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                            data-mdb-ripple="true"
                                            data-mdb-ripple-color="light"
                                        >
                                            Login
                                        </button>
                                        <div className="flex py-5 justify-center items-center mb-6">
                                        </div>
                                    </div>
                                </div>
                                <p className=" text-gray-500 dark:text-gray-400">
                                    Need an account?{" "}
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