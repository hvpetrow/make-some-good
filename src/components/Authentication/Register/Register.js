import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './Register.module.css';

import { useAuth } from '../../../contexts/AuthContext'
import userValidation from '../../../validation/userValidation';
import useInput from '../../../hooks/useInput';


export const Register = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const { signUp, currentUser, setUserAdditionalInfo } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const emailInput = useInput(userValidation.emailIsValid);
    const firstNameInput = useInput(userValidation.nameIsLength);
    const lastNameInput = useInput(userValidation.nameIsLength);
    const countryInput = useInput(userValidation.countryIsLength);
    const passwordInput = useInput(userValidation.passwordIsLength);
    const repeatPasswordInput = useInput(userValidation.isEqual.bind(null, passwordInput.value));

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const inputFieldsIsValid = firstNameInput.fieldIsValid
        && lastNameInput.fieldIsValid
        && emailInput.fieldIsValid
        && countryInput.fieldIsValid
        && passwordInput.fieldIsValid
        && repeatPasswordInput.fieldIsValid;

    const showPasswordHandler = () => {
        setShowPassword(state => !state);
    };

    const showRepeatPasswordHandler = () => {
        setShowRepeatPassword(state => !state);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (passwordInput.value !== repeatPasswordInput.value) {
            toast.error("Passwords don't match!!");
            return;
        }

        try {
            setIsLoading(true);
            const { user } = await signUp(emailInput.value, passwordInput.value);
            const additionalUserData = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                country: countryInput.value,
                causes: 0
            }

            const settedUserWithAdditionalData = await setUserAdditionalInfo(additionalUserData, user.uid)
            toast.success('Successfully Registered!');
            navigate('/');
        } catch (error) {
            toast.error('Email already exist!');
        }

        setIsLoading(false);
    }

    return (

        <section id={styles['register']}>
            <div className={styles['img-ctn']}>
                <img
                    src={require("../../../assets/register.jpg")}
                    className={styles['img']}
                    alt="registerImg"
                />
            </div>
            <div className={styles['content-ctn']}>
                <h2 className={styles['title']}>Sign Up</h2>
                {currentUser && currentUser.email}
                <form onSubmit={submitHandler}>
                    {/* Email input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="email" className={styles['label']}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={`${styles['input']} ${emailInput.hasError && styles['error-input-field']}`}
                            placeholder="user@gmail.com"
                            required
                            value={emailInput.value}
                            onChange={emailInput.onChange}
                            onBlur={emailInput.onBlur}
                        />

                        {emailInput.hasError && <p className={styles['alert']}>Email is not valid!!</p>}
                    </div>
                    {/* First Name input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="firstName" className={styles['label']}>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className={`${styles['input']} ${firstNameInput.hasError && styles['error-input-field']}`}
                            placeholder="Max"
                            required
                            value={firstNameInput.value}
                            onChange={firstNameInput.onChange}
                            onBlur={firstNameInput.onBlur}
                        />

                        {firstNameInput.hasError && <p className={styles['alert']}>First Name must be at least 2 characters long!!</p>}
                    </div>
                    {/* Last Name input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="lastName" className={styles['label']}>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className={`${styles['input']} ${lastNameInput.hasError && styles['error-input-field']}`}
                            placeholder="Mustermann"
                            required
                            value={lastNameInput.value}
                            onChange={lastNameInput.onChange}
                            onBlur={lastNameInput.onBlur}
                        />
                        {lastNameInput.hasError && <p className={styles['alert']}>Last Name must be at least 2 characters long!!</p>}
                    </div>
                    {/* Country input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="country" className={styles['label']}>Country:</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            className={`${styles['input']} ${countryInput.hasError && styles['error-input-field']}`}
                            placeholder="Germany"
                            required
                            value={countryInput.value}
                            onChange={countryInput.onChange}
                            onBlur={countryInput.onBlur}
                        />
                        {countryInput.hasError && <p className={styles['alert']}>Country is not valid!!</p>}
                    </div>
                    {/* Password input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="password" className={styles['label']}>Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={`${styles['input']} ${passwordInput.hasError && styles['error-input-field']}`}
                            placeholder="******"
                            required
                            value={passwordInput.value}
                            onChange={passwordInput.onChange}
                            onBlur={passwordInput.onBlur}
                        />
                        <span className={passwordInput.hasError ? styles['password-icon-error'] : styles['password-icon']} onClick={showPasswordHandler}>
                            {showPassword
                                ? <FontAwesomeIcon icon={faEye} />
                                : <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </span>
                        {passwordInput.hasError && (
                            <p className={styles['alert']}>Password must be at least 6 characters long!!</p>
                        )}
                    </div>
                    <div className={styles['input-ctn']}>
                        <label htmlFor="repass" className={styles['label']}>Repeat Password:</label>
                        <input
                            type={showRepeatPassword ? 'text' : 'password'}
                            name="repass"
                            id="repass"
                            className={`${styles['input']} ${repeatPasswordInput.hasError && styles['error-input-field']}`}
                            placeholder="******"
                            required
                            value={repeatPasswordInput.value}
                            onChange={repeatPasswordInput.onChange}
                            onBlur={repeatPasswordInput.onBlur}
                        />

                        <span className={repeatPasswordInput.hasError ? styles['repass-icon-error'] : styles['password-icon']} onClick={showRepeatPasswordHandler}>
                            {showRepeatPassword
                                ? <FontAwesomeIcon icon={faEye} />
                                : <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </span>
                        {repeatPasswordInput.hasError && (
                            <p className={styles['alert']}>Passwords do not match!!</p>
                        )}
                    </div>
                    {/* Submit button */}
                    <button
                        disabled={!inputFieldsIsValid || isLoading}
                        type="submit"
                        className={styles['btn']}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Sign up
                    </button>
                    <div className={styles['log-link-ctn']}>
                        <span className={styles['span']}>
                            Already have an account?{" "}
                        </span>
                        <Link
                            to="/login"
                            className={styles['login-link']}
                        >
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}


