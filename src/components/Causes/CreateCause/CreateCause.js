import styles from './CreateCause.module.css';

import { collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { add } from '../../../services/crudService';
import { dateValidator, descriptionValidator, placeValidator, purposeValidator, titleValidator, urlValidator } from '../../../validation/validators';


const causesCollectionRef = collection(db, 'causes');

export const CreateCause = () => {
    document.title = 'Create';

    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [errors, setErrors] = useState({});


    let [values, setValues] = useState({
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

    const [hasTouched, setHasTouched] = useState({
        title: false,
        purpose: false,
        place: false,
        date: false,
        imgUrl: false,
        description: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    const { title, purpose, place, date, description } = hasTouched;

    let required;
    if (title && purpose && place && date && description) {
        required = true;
    }

    const isFormValid = required && Object.values(errors).every(x => x === true);
    console.log(errors);
    console.log("required " + required);
    console.log('isFormValid ' + isFormValid);

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log(values);

        if (!isFormValid) {
            toast.error('Cause is not valid');
            return;
        }

        try {
            setIsLoading(true);
            if (values.imgUrl === '') {
                values = { ...values, imgUrl: 'https://media.istockphoto.com/id/1253505221/vector/stylized-volunteers-help-charity-and-sharing-hope.jpg?s=612x612&w=0&k=20&c=Fx6iI85QcfatEHM9DkKIyDF0q4SvDJtbf8Wj5lbJhPQ=' }
            }
            const addedDoc = await add(causesCollectionRef, values);

            const updateTimestamp = await updateDoc(addedDoc, {
                createdAt: serverTimestamp()
            });

            toast.success('Successfully Created Cause!');
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('Failed to create a new cause');
        }

        setIsLoading(false);
    }

    console.log(errors);
    console.log(values);
    console.log(hasTouched);
    console.log(isFormValid);

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
                            onBlur={(e) => titleValidator(e, setHasTouched, setErrors, values)}
                        />
                        {(values.title === '' && hasTouched.title) && (
                            <p className={styles['alert']}>Title is required!!</p>
                        )}
                        {(!errors.title && hasTouched.title && values.title !== '') && (
                            <p className={styles['alert']}>Title must be between 3 and 28 symbols!!</p>
                        )}
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
                            onBlur={(e) => purposeValidator(e, setHasTouched, setErrors, values)}
                        />
                        {(values.purpose === '' && hasTouched.purpose) && (
                            <p className={styles['alert']}>Purpose is required!!</p>
                        )}
                        {(!errors.purpose && hasTouched.purpose && values.purpose !== '') && (
                            <p className={styles['alert']}>Purpose must be between 2 and 30 symbols!!</p>
                        )}
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
                            onBlur={(e) => placeValidator(e, setHasTouched, setErrors, values)}
                        />
                        {(values.place === '' && hasTouched.place) && (
                            <p className={styles['alert']}>Place is required!!</p>
                        )}
                        {(!errors.place && hasTouched.place && values.place !== '') && (
                            <p className={styles['alert']}>Place must be between 2 and 28 symbols!!</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="date"
                            className={styles['form-input']}
                            placeholder="in format DD/MM/YYYY"
                            required
                            value={values.date}
                            onChange={changeHandler}
                            onBlur={(e) => dateValidator(e, setHasTouched, setErrors, values)}
                        />
                        {(values.date === '' && hasTouched.date) && (
                            <p className={styles['alert']}>Date is required!!</p>
                        )}
                        {(!errors.date && hasTouched.date && values.date !== '') && (
                            <p className={styles['alert']}>Date is not valid!!</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="imgUrl"
                            className={styles['form-input']}
                            placeholder="Example: https://pixlr.eu/makeSomeGood.png"
                            // required
                            value={values.imgUrl}
                            onChange={changeHandler}
                            onBlur={(e) => urlValidator(e, setHasTouched, setErrors, values)}
                        />
                        {(!errors.imgUrl && hasTouched.imgUrl && values.imgUrl !== '') && (
                            <p className={styles['alert']}>Image url is not valid!!</p>
                        )}
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
                                onBlur={(e) => descriptionValidator(e, setHasTouched, setErrors, values)}

                            />
                            {(values.description === '' && hasTouched.description) && (
                                <p className={styles['alert']}>Date is required!!</p>
                            )}
                            {(!errors.description && hasTouched.description && values.description !== '') && (
                                <p className={styles['alert']}>Description must be between 5 and 800 symbols!!</p>
                            )}
                        </div>
                    </div>
                    {/* Submit button */}
                    <div className={styles['btn-container']}>
                        <button
                            type="submit"
                            className={styles['submit-btn']}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            disabled={!isFormValid && !isLoading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}
