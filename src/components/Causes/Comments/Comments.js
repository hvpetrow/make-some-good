import { convertTimestamp } from '../../../utils/timestampConverter';
import styles from './Comments.module.css';
import yesno from "yesno-dialog";


import React, { useState } from 'react'
import { deleteComment, updateComment } from '../../../services/commentsService';

export const Comments = ({ id, comment, currentUserId, getCommentsByCauseId, causeId, storeComments }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const created = convertTimestamp(comment.createdAt);

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

    const updateHandler = async () => {
        try {
            setIsLoading(true);
            setIsEdited(true);
            await updateComment(id);

            getCommentsByCauseId(causeId)
                .then((commentDocs) => {
                    storeComments(commentDocs);
                });
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);

    }

    return (
        <li>
            <div className={styles["owner-info"]}>
                <span className={styles["owner"]}>{comment.ownerEmail}</span>
            </div>
            <div className={styles["comment-content"]}>
                <div className={styles["comment"]}>
                    <p>
                        {comment.content}
                    </p>
                    <div className={styles["right-side"]}>
                        {(comment.ownerId === currentUserId) &&
                            !isEdited ? <div className={styles["buttons"]}>
                            <button onClick={updateHandler} className={styles["edit-btn"]} disabled={isLoading}>Edit</button>
                            <button onClick={deleteHandler} className={styles["delete-btn"]} disabled={isLoading}>Delete</button>
                        </div>
                            : <button className={styles["edit-btn"]} disabled={isLoading}>Post</button>
                        }
                        <span className={styles["timestamp"]}>{created}</span>
                    </div>
                </div>
            </div >
        </li >
    )
}
