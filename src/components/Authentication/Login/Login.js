import styles from './Login.module.css';

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../../contexts/AuthContext";

export const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const { logIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (values.email === '' || values.password === '') {
            return;
        }

        try {
            setIsLoading(true);
            await logIn(values.email, values.password);
            toast.success('Successfully Login!');

            navigate('/');
        } catch (error) {
            toast.error('Wrong email or password');
        }

        setIsLoading(false);
    }

    return (
        <section id={styles['login']} >
            <div className={styles['login-ctn']}>
                <div className={styles['img-ctn']}>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className={styles['img']}
                        alt="logImg"
                    />
                </div>
                <div className={styles['content-ctn']}>
                    <h2 className={styles['title']}>Login</h2>
                    <form id='login-form' onSubmit={submitHandler} >
                        <label htmlFor="inputEmail" className={styles['label']}>Email address:</label>
                        <div className={styles['input-ctn']}>
                            <input
                                name="email"
                                className={styles['input']}
                                type="text"
                                placeholder="user@gmail.com"
                                required
                                id="inputEmail"
                                value={values.email}
                                onChange={changeHandler}
                            />
                        </div>
                        <label htmlFor="inputPassword" className={styles['label']}>Password:</label>
                        <div className={styles['input-ctn']}>
                            <input
                                name="password"
                                className={styles['input']}
                                type="password"
                                placeholder="******"
                                required
                                id="inputPassword"
                                value={values.password}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles['btn-ctn']}>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className={styles['btn']}
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Log In
                            </button>
                        </div>
                        <Link
                            to="/forgot-password"
                            className={styles['link']}
                        >
                            Forgot Password?
                        </Link>
                        <div className={styles['link-span-ctn']}>
                            <span className={styles['span']}>
                                Need an account?&nbsp;
                            </span>
                            <Link
                                to="/register"
                                className={`${styles['link']} ${styles['link-span']}`}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}