import styles from './ChangePassword.module.css';

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
    const { logout, updatePasswordForCurrentUser } = useAuth();

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

        setIsLoading(true);

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
    }

    return (

        <section id={styles['change-password']}>
            <div className={styles['img-ctn']}>
                <img
                    src={require("../../assets/settings.jpg")}
                    className={styles['img']}
                    alt="loginImg"
                />
            </div>
            <div className={styles['content-ctn']}>
                <h2 className={styles['title']}>Change Password</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="inputPassword" className={styles['label']}>Password</label>
                    <div className={styles['input-ctn']}>
                        <input
                            type="password"
                            name="newPassword"
                            id='inputPassword'
                            required
                            className={styles['input']}
                            placeholder="Your new password"
                            value={values.newPassword}
                            onChange={changeHandler}
                        />
                    </div>
                    <label htmlFor="inputRepass" className={styles['label']}>Repeat Password</label>
                    <div className={styles['input-ctn']}>
                        <input
                            type="password"
                            name="repass"
                            id='inputRepass'
                            required
                            className={styles['input']}
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
        </section>
    )
}



