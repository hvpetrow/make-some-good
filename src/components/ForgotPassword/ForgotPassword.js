import styles from './ForgotPassword.module.css';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';

export const ForgotPassword = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
    });

    const { resetPassword } = useAuth();
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
            toast.success('You have successfuly reseted your password')
            toast.warning("Check your inbox for further instructions");
        } catch (error) {
            toast.error('Failed to reset password');
        }

        setIsLoading(false);
    }

    return (
        <section id={styles['forgot-password']}>
            <h2 className={styles['title']}>Password Reset</h2>
            <form onSubmit={submitHandler} >
                <label htmlFor="inputEmail" className={styles['label']}>Email address</label>
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
                <div className={styles['btn-ctn']}>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className={styles['btn']}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Reset Password
                    </button>
                </div>
                <Link
                    to="/login"
                    className={styles['link']}
                >
                    Login
                </Link>
                <div className={styles['link-span-ctn']}>
                    <span className={styles['span']}>
                        Need an account?&nbsp;
                    </span>
                    <Link
                        to="/register"
                        className={styles['link', 'link-span']}
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </section>

    );
}
