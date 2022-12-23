import styles from './CreateCause.module.css';

import { collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { add } from '../../../services/crudService';


const causesCollectionRef = collection(db, 'causes');

export const CreateCause = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [values, setValues] = useState({
        title: '',
        purpose: '',
        place: '',
        date: '',
        imgUrl: '',
        description: '',
        participants: [

        ],
        creator: currentUser.uid
    });

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

        try {
            setIsLoading(true);
            const addedDoc = await add(causesCollectionRef, values);

            const updateTimestamp = await updateDoc(addedDoc, {
                createdAt: serverTimestamp()
            });

            toast.success('Successfully Created Cause!');
            navigate('/');
        } catch (error) {
            console.log(error);
            setError('Failed to sign in');
        }

        setIsLoading(false);
    }

    return (

        <section id="create-cause" className={styles['create-cause']}>
            <div className={styles['create-cause-ctn']}>
                <h2 className={styles['title']}>Create Cause</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="title"
                            className={styles['form-input']}
                            placeholder="Title"
                            required
                            value={values.title}
                            onChange={changeHandler}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="purpose"
                            className={styles['form-input']}
                            placeholder="Purpose"
                            required
                            value={values.purpose}
                            onChange={changeHandler}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="place"
                            className={styles['form-input']}
                            placeholder="Place"
                            required
                            value={values.place}
                            onChange={changeHandler}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="date"
                            className={styles['form-input']}
                            placeholder="Date"
                            required
                            value={values.date}
                            onChange={changeHandler}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="imgUrl"
                            className={styles['form-input']}
                            placeholder="Example: https://pixlr.eu/makeSomeGood.png"
                            required
                            value={values.imgUrl}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className={styles['label']}
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                className={styles['form-desc']}
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={values.description}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <div className="show_info text-sm mb-4 w-max text-red-400" >
                        {/* <p>{error}</p> */}
                    </div>

                    {/* Submit button */}
                    <div className={styles['btn-container']}>
                        <button
                            type="submit"
                            className={styles['submit-btn']}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}
