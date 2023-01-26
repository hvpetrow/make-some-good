import React, { useState } from 'react'

import styles from './CommentBox.module.css';
import commentValidation from '../../../validation/commentValidation';
import useInput from '../../../hooks/useInput';
import { addComment, getCommentsByCauseId } from '../../../services/commentsService';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Comments } from '../Comments/Comments';

export default function CommentBox({ comments, isShowedComments, setIsShowedComments, storeComments, currentUser, causeId }) {
    const [isLoading, setIsLoading] = useState(false);

    const contentInput = useInput(commentValidation.contentIsLength);

    const postComment = async () => {
        try {
            setIsLoading(true);

            const comment = {
                content: contentInput.value,
                createdAt: serverTimestamp(),
                ownerId: currentUser.uid,
                ownerEmail: currentUser.email,
                causeId: causeId
            }

            await addComment(comment);

            getCommentsByCauseId(causeId)
                .then((commentDocs) => {
                    storeComments(commentDocs);
                });

            contentInput.fieldReset();
            setIsShowedComments(true);
            toast.success('Successfully added comment!');
        } catch (error) {
            console.log(error);
            toast.error('Failed to post a new comment');
        }

        setIsLoading(false);
    }

    console.log(comments);

    return (
        <section id={styles["comments"]}>
            <div className={styles["comments-info"]}>
                <ul className={styles["noBullet"]}>
                    {(isShowedComments && !isLoading) &&
                        (comments.map(c => <Comments key={c.id} id={c.id} comment={c.fields} currentUserId={currentUser.uid} getCommentsByCauseId={getCommentsByCauseId} causeId={causeId} storeComments={storeComments} />))
                    }
                    <>
                        <li>
                            <textarea
                                id="content"
                                className={styles["inputFields"]}
                                name="content"
                                placeholder="..."
                                type="text"
                                value={contentInput.value}
                                onChange={contentInput.onChange}
                                onBlur={contentInput.onBlur}
                            ></textarea>
                        </li>
                        {contentInput.hasError && <p className={styles['alert']}>Comment must be between 2 and 300 characters!!</p>}
                        <li id="center-btn">
                            <button
                                onClick={postComment}
                                id={styles["post-btn"]}
                                disabled={!contentInput.fieldIsValid || isLoading}
                            >
                                Post Comment
                            </button>
                        </li>
                    </>
                </ul >
            </div >
        </section >
    );
}
