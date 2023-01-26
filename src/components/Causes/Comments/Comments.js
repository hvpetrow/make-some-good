import styles from './Comments.module.css';

import React from 'react'

export const Comments = ({ id, comment, currentUserId }) => {
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
                        {/* if owner */}
                        {(comment.ownerId === currentUserId) &&
                            <div className="buttons">
                                <button className={styles["delete-btn"]}>Delete</button>
                                <button className={styles["edit-btn"]}>Edit</button>
                            </div>
                        }
                        <span className={styles["timestamp"]}>{id}</span>
                    </div>
                </div>
            </div >
        </li >
    )
}
