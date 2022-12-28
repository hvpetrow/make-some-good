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
    console.log('isFormValid' + isFormValid);
    return (

        <section id={styles['register']}>
            <div className={styles['img-ctn']}>
                <img
                    src={require("../../assets/register.jpg")}
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
                            className={styles['input']}
                            placeholder="user@gmail.com"
                            required
                            value={values.email}
                            onChange={changeHandler}
                            onBlur={(e) => emailValidator(e)}
                        />

                        {(!errors.email && hasTouched.email) && (
                            <p className={styles['alert']}>Email is not valid!!</p>
                        )}
                    </div>
                    {/* First Name input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="firstName" className={styles['label']}>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className={styles['input']}
                            placeholder="Max"
                            required
                            value={values.displayName}
                            onChange={changeHandler}
                            onBlur={(e) => nameValidator(e)}
                        />

                        {(!errors.firstName && hasTouched.firstName) && (
                            <p className={styles['alert']}>First Name must be at least 2 characters long!!</p>
                        )}
                    </div>
                    {/* Last Name input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="lastName" className={styles['label']}>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className={styles['input']}
                            placeholder="Mustermann"
                            required
                            value={values.displayName}
                            onChange={changeHandler}
                            onBlur={(e) => nameValidator(e)}
                        />
                        {(!errors.lastName && hasTouched.lastName) && (
                            <p className={styles['alert']}>Last Name must be at least 2 characters long!!</p>
                        )}
                    </div>
                    {/* Country input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="country" className={styles['label']}>Country:</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            className={styles['input']}
                            placeholder="Germany"
                            required
                            value={values.country}
                            onChange={changeHandler}
                            onBlur={(e) => nameValidator(e)}
                        />
                        {(!errors.country && hasTouched.country) && (
                            <p className={styles['alert']}>Country is not valid!!</p>
                        )}
                    </div>
                    {/* Password input */}
                    <div className={styles['input-ctn']}>
                        <label htmlFor="password" className={styles['label']}>Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={styles['input']}
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
                            <p className={styles['alert']}>Password must be at least 6 characters long!!</p>
                        )}
                    </div>
                    <div className={styles['input-ctn']}>
                        <label htmlFor="repass" className={styles['label']}>Repeat Password:</label>
                        <input
                            type={showRepeatPassword ? 'text' : 'password'}
                            name="repass"
                            id="repass"
                            className={styles['input']}
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
                            <p className={styles['alert']}>Passwords do not match!!</p>
                        )}
                    </div>
                    {/* Terms and Conditions */}
                    <div className={styles['tac-ctn']}>
                        <input
                            id="terms"
                            aria-describedby="terms"
                            type="checkbox"
                            name="terms"
                            className={styles['tac-input']}
                            required
                            value={tac}
                            onChange={tacChangeHandler}
                        />
                        <span>I accept the</span>
                        <Link
                            className={styles['link']}
                            to="/tac"
                        >
                            Terms and Conditions
                        </Link>
                    </div>

                    {/* Submit button */}
                    <button
                        disabled={!isFormValid}
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


