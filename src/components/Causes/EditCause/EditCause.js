import styles from './EditCause.module.css';

import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from '../../../firebase';
import { getOneCause } from '../../../services/causesService';
import useInput from '../../../hooks/useInput';
import causeValidation from '../../../validation/causeValidation';

export const EditCause = () => {
    const { causeId } = useParams();
    const navigate = useNavigate();

    const [cause, setCause] = useState('');
    const [docId, setDocId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const titleInput = useInput(causeValidation.titleIsLength, cause?.title);
    console.log(titleInput.value);
    const purposeInput = useInput(causeValidation.purposeIsLength);
    const placeInput = useInput(causeValidation.placeIsLength);
    const dateInput = useInput(causeValidation.dateIsValid);
    const imgUrlInput = useInput(causeValidation.urlIsValid);
    const descriptionInput = useInput(causeValidation.descriptionIsLength);

    const inputFieldsIsValid = titleInput.fieldIsValid
        && purposeInput.fieldIsValid
        && placeInput.fieldIsValid
        && dateInput.fieldIsValid
        && imgUrlInput.fieldIsValid
        && descriptionInput.fieldIsValid;


    useEffect(() => {
        document.title = 'Edit';

        try {
            getOneCause(causeId)
                .then(doc => {
                    setDocId(doc.id);
                    setCause(doc.data());
                });
        } catch (error) {
            console.log(error);
        }

        if (cause) {
            titleInput.setValue(cause.title);
            purposeInput.setValue(cause.purpose);
            placeInput.setValue(cause.place);
            dateInput.setValue(cause.date);
            imgUrlInput.setValue(cause.imgUrl);
            descriptionInput.setValue(cause.description);
        }
    }, [cause.title]);


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!inputFieldsIsValid) {
            toast.error('Cause is not valid');
            return;
        }

        try {
            setIsLoading(true);

            if (imgUrlInput.value === '') {
                imgUrlInput.value = 'https://media.istockphoto.com/id/1253505221/vector/stylized-volunteers-help-charity-and-sharing-hope.jpg?s=612x612&w=0&k=20&c=Fx6iI85QcfatEHM9DkKIyDF0q4SvDJtbf8Wj5lbJhPQ=';
            }

            const editedCause = {
                title: titleInput.value,
                purpose: purposeInput.value,
                place: placeInput.value,
                date: dateInput.value,
                imgUrl: imgUrlInput.value,
                description: descriptionInput.value
            }

            const currentCauseRef = doc(db, "causes", docId);
            await updateDoc(currentCauseRef, editedCause);

            toast.success('Successfully Updated Cause!');
            navigate(`/details/${causeId}`);
        } catch (error) {
            console.log(error);
            toast.error('Failed to edit this cause');
        }

        setIsLoading(false);
    }


    return (
        <section id="create-cause" className={styles['create-cause']}>
            <div className={styles['create-cause-ctn']}>
                <h2 className={styles['title']}>Edit Cause</h2>
                <form onSubmit={submitHandler}>
                    <div className={styles['input-ctn']}>
                        <label
                            className={styles['label']}
                            htmlFor="title"
                        >
                            Title:
                        </label>
                        <input
                            type="text"
                            name="title"
                            id='title'
                            className={`${styles['form-input']} ${titleInput.hasError && styles['error-input-field']}`}
                            placeholder="Title"
                            required
                            value={titleInput.value}
                            onChange={titleInput.onChange}
                            onBlur={titleInput.onBlur}
                        />
                        {(titleInput.value === '' && titleInput.hasTouched) && <p className={styles['alert']}>Title is required!!</p>}
                        {(titleInput.hasError && titleInput.value !== '') && <p className={styles['alert']}>Title must be between 3 and 28 symbols!!</p>}
                    </div>
                    <div className={styles['input-ctn']}>
                        <label
                            className={styles['label']}
                            htmlFor="purpose"
                        >
                            Purpose:
                        </label>
                        <input
                            type="text"
                            name="purpose"
                            id='purpose'
                            className={`${styles['form-input']} ${purposeInput.hasError && styles['error-input-field']}`}
                            placeholder="Purpose"
                            required
                            value={purposeInput.value}
                            onChange={purposeInput.onChange}
                            onBlur={purposeInput.onBlur}
                        />
                        {(purposeInput.value === '' && purposeInput.hasTouched) && <p className={styles['alert']}>Purpose is required!!</p>}
                        {(purposeInput.hasError && purposeInput.value !== '') && <p className={styles['alert']}>Purpose must be between 2 and 30 symbols!!</p>}
                    </div>
                    <div className={styles['input-ctn']}>
                        <label
                            className={styles['label']}
                            htmlFor="place"
                        >
                            Place:
                        </label>
                        <input
                            type="text"
                            name="place"
                            id='place'
                            className={`${styles['form-input']} ${placeInput.hasError && styles['error-input-field']}`}
                            placeholder="Place"
                            required
                            value={placeInput.value}
                            onChange={placeInput.onChange}
                            onBlur={placeInput.onBlur}
                        />
                        {(placeInput.value === '' && placeInput.hasTouched) && <p className={styles['alert']}>Place is required!!</p>}
                        {(placeInput.hasError && placeInput.value !== '') && <p className={styles['alert']}>Place must be between 2 and 28 symbols!!</p>}
                    </div>
                    <div className={styles['input-ctn']}>
                        <label
                            className={styles['label']}
                            htmlFor="date"
                        >
                            Date:
                        </label>
                        <input
                            type="text"
                            name="date"
                            id='date'
                            className={`${styles['form-input']} ${dateInput.hasError && styles['error-input-field']}`}
                            placeholder="Date"
                            required
                            value={dateInput.value}
                            onChange={dateInput.onChange}
                            onBlur={dateInput.onBlur}
                        />
                        {(dateInput.value === '' && dateInput.hasTouched) && <p className={styles['alert']}>Date is required!!</p>}
                        {(dateInput.hasError && dateInput.value !== '') && <p className={styles['alert']}>Date is not valid!!</p>}
                    </div>
                    <div className={styles['input-ctn']}>
                        <label
                            className={styles['label']}
                            htmlFor="imgUrl"
                        >
                            Img-Url:
                        </label>
                        <input
                            type="text"
                            name="imgUrl"
                            id='imgUrl'
                            className={`${styles['form-input']} ${imgUrlInput.hasError && styles['error-input-field']}`}
                            placeholder="Example: https://pixlr.eu/makeSomeGood.png"
                            value={imgUrlInput.value}
                            onChange={imgUrlInput.onChange}
                            onBlur={imgUrlInput.onBlur}
                        />
                        {(imgUrlInput.hasError && imgUrlInput.value !== '') && <p className={styles['alert']}>Image url iS not valid!!</p>}
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className={styles['label']}
                                htmlFor="description"
                            >
                                Description:
                            </label>
                            <textarea
                                className={`${styles['form-desc']} ${descriptionInput.hasError && styles['error-input-field']}`}
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={descriptionInput.value}
                                onChange={descriptionInput.onChange}
                                onBlur={descriptionInput.onBlur}
                            />
                            {(descriptionInput.value === '' && descriptionInput.hasTouched) && <p className={styles['alert']}>Date is required!!</p>}
                            {(descriptionInput.hasError && descriptionInput.value !== '') && <p className={styles['alert']}>Description must be between 5 and 800 symbols!!</p>}
                        </div>
                    </div>
                    {/* Submit button */}
                    <div className={styles['btn-container']}>
                        <button
                            type="submit"
                            className={styles['submit-btn']}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            disabled={!inputFieldsIsValid || isLoading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}
