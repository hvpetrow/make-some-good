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

    const onForgot = () => {
        navigate('/forgot-password');
    }

    return (
        <div className={styles['overlay']}>
            <form onSubmit={submitHandler}>
                <div className={styles['con']}>
                    <div className={styles['head-form']}>
                        <h2>Log In</h2>
                        <p>login here using your email and password</p>
                    </div>
                    <br />
                    <div className={styles["field-set"]}>
                        <span className={styles["input-item"]}>
                            <i className="fa fa-user-circle"></i>
                        </span>
                        <input className={styles["form-input"]} id="txt-input" name='email' type="text" placeholder="@UserName" required value={values.email}
                            onChange={changeHandler} />
                        <br />
                        <span className={styles["input-item"]}>
                            <i className="fa fa-key"></i>
                        </span>
                        <input className={styles["form-input"]} id="password" name="pwd" type="password" placeholder="Password" value={values.password}
                            onChange={changeHandler} required />
                        <span>
                            <i className="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>
                        </span>
                        <br />
                        <button className={styles["log-in"]}> Log In </button>
                    </div>
                    <div className={styles['other']}>
                        <button onClick={onForgot} className={styles['btn', 'submits', 'frgt-pass']}>Forgot Password</button>
                        <button className={styles['btn', 'submits', 'sign-up']}>Sign Up
                            <i className="fa fa-user-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}