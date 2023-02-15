import styles from './ChangePassword.module.css';

import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext'
import userValidation from '../../../validation/userValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const ChangePassword = () => {
    const [values, setValues] = useState({
        newPassword: '',
        repass: '',
    });

    const [hasTouched, setHasTouched] = useState({
        newPassword: false,
        repass: false
    });

    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const navigate = useNavigate();
    const { logout, updatePasswordForCurrentUser } = useAuth();

    useEffect(() => {
        document.title = 'ChangePassword';
    }, []);

    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

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

    const showPasswordHandler = () => {
        setShowPassword(state => !state);
    };

    const showRepeatPasswordHandler = () => {
        setShowRepeatPassword(state => !state);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (values.newPassword !== values.repass) {
            return toast.error('Passwords do not match');
        }

        setIsLoading(true);

        if (values.newPassword && values.repass) {
            try {
                await updatePasswordForCurrentUser(values.newPassword);
                await logout();
                navigate('/login');
            } catch (error) {
                console.log(error);
                toast.error(error.msg);
            }

            setIsLoading(false);
        }
    }

    return (

        <section id={styles['change-password']}>
            <div className={styles['img-ctn']}>
                <img
                    src={require("../../../assets/settings.jpg")}
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
                            onBlur={(e) => passwordValidator(e)}
                        />
                        <span className={styles['password-icon']} onClick={showPasswordHandler}>
                            {showPassword
                                ? <FontAwesomeIcon icon={faEye} />
                                : <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </span>
                        {(!errors.password && hasTouched.password) && (
                            <p className={styles['alert']}>Password must be at least 6 characters long!!</p>
                        )}
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
                            onBlur={(e) => rePassValidator(e)}
                        />
                        <span className={styles['password-icon']} onClick={showRepeatPasswordHandler}>
                            {showRepeatPassword
                                ? <FontAwesomeIcon icon={faEye} />
                                : <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </span>
                        {(!errors.repass && hasTouched.repass) && (
                            <p className={styles['alert']}>Passwords do not match!!</p>
                        )}
                    </div>
                    {/* Submit button */}
                    <div className={styles['btn-ctn']}>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={styles['btn']}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        >
                            Submit
                        </button>
                    </div>
                    <Link
                        to="/my-profile"
                        className={styles['link']}
                    >
                        Cancel
                    </Link>
                </form>
            </div>
        </section>
    )
}



