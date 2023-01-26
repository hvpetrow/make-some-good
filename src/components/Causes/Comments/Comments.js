import { convertTimestamp } from '../../../utils/timestampConverter';
import styles from './Comments.module.css';
import yesno from "yesno-dialog";


import React, { useState } from 'react'
import { deleteComment, updateComment } from '../../../services/commentsService';
import useInput from '../../../hooks/useInput';
import commentValidation from '../../../validation/commentValidation';
import { useEffect } from 'react';

export const Comments = ({ id, comment, currentUserId, getCommentsByCauseId, causeId, storeComments }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const created = convertTimestamp(comment.createdAt);

    const commentInput = useInput(commentValidation.contentIsLength);

    useEffect(() => {

    }, [id, comment.content]);

    const deleteHandler = async () => {
        const confirm = await yesno({ bodyText: "Are you sure to delete this comment?" });


        if (confirm) {
            try {
                setIsLoading(true);
                await deleteComment(id);

                getCommentsByCauseId(causeId)
                    .then((commentDocs) => {
                        storeComments(commentDocs);
                    });
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        }
    }

    const setEdit = async () => {
        setIsEdited(true);
        if (comment) {
            commentInput.setValue(comment.content);

        }
        console.log(comment);

    }


    const updateHandler = async () => {
        try {
            setIsLoading(true);
            const editedComment = {
                ...comment,
                content: commentInput.value
            }

            console.log(editedComment);

            await updateComment(id, editedComment);

            getCommentsByCauseId(causeId)
                .then((commentDocs) => {
                    storeComments(commentDocs);
                });

            setIsEdited(false);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);

    }
    console.log(commentInput);

    return (
        <li>
            <div className={styles["owner-info"]}>
                <span className={styles["owner"]}>{comment.ownerEmail}</span>
            </div>
            <div className={styles["comment-content"]}>
                <div className={styles["comment"]}>
                    {(comment.ownerId === currentUserId) &&
                        !isEdited ? <p>
                        {comment.content}
                    </p>
                        : <input
                            type="text"
                            name="comment"
                            className={`${styles['edit-comment_input']} ${commentInput.hasError && styles['error-input-field']}`}
                            placeholder="Comment"
                            required
                            value={commentInput.value}
                            onChange={commentInput.onChange}
                            onBlur={commentInput.onBlur}
                        />
                    }
                    {(commentInput.hasError && isEdited) && <p className={styles['alert']}>Comment must be between 2 and 300 characters!!</p>}
                    <div className={styles["right-side"]}>
                        {(comment.ownerId === currentUserId) &&
                            !isEdited ? <div className={styles["buttons"]}>
                            <button onClick={setEdit} className={styles["edit-btn"]} disabled={isLoading}>Edit</button>
                            <button onClick={deleteHandler} className={styles["delete-btn"]} disabled={isLoading}>Delete</button>
                        </div>
                            : <div className={styles["buttons"]}>
                                <button onClick={updateHandler} className={styles["edit-btn"]} disabled={!commentInput.fieldIsValid || isLoading}>Post</button>
                            </div>
                        }
                        <span className={styles["timestamp"]}>{created}</span>
                    </div>
                </div>
            </div >
        </li >
    )
}
