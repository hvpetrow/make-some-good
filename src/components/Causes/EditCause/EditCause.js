import styles from './EditCause.module.css';

import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from '../../../firebase';
import { getOneCause } from '../../../services/causesService';

export const EditCause = () => {
    const { causeId } = useParams();
    const navigate = useNavigate();

    const [cause, setCause] = useState('');
    const [docId, setDocId] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            getOneCause(causeId)
                .then(doc => {
                    setDocId(doc.id);
                    setCause(doc.data());
                });

        } catch (error) {
            console.log(error);
        }
    }, []);


    const submitHandler = async (e) => {
        e.preventDefault();

        const editedCause = Object.fromEntries(new FormData(e.target));

        console.log(editedCause);

        try {
            const currentCauseRef = doc(db, "causes", docId);
            setIsLoading(true);
            await updateDoc(currentCauseRef, editedCause);

            toast.success('Successfully Updated Cause!');
            navigate(`/details/${causeId}`);
        } catch (error) {
            console.log(error);
            setError('Failed to updated');
        }

        setIsLoading(false);
    }

    return (
        <section id="create-cause" className={styles['create-cause']}>
            <div className={styles['create-cause-ctn']}>
                <h2 className={styles['title']}>Edit Cause</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="title"
                            className={styles['form-input']}
                            placeholder="Title"
                            required
                            defaultValue={cause.title}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="purpose"
                            className={styles['form-input']}
                            placeholder="Purpose"
                            required
                            defaultValue={cause.purpose}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="place"
                            className={styles['form-input']}
                            placeholder="Place"
                            required
                            defaultValue={cause.place}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="date"
                            className={styles['form-input']}
                            placeholder="Date"
                            required
                            defaultValue={cause.date}

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="imgUrl"
                            className={styles['form-input']}
                            placeholder="Example: https://pixlr.eu/makeSomeGood.png"
                            defaultValue={cause.imgUrl}

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
                                defaultValue={cause.description}

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
