import styles from './Comments.module.css';

import React from 'react'

export const Comments = () => {
    return (
        <li>
            <div className={styles["owner-info"]}>
                <span className={styles["owner"]}>name</span>
            </div>
            <div className={styles["comment-content"]}>
                <div className={styles["comment"]}>
                    <p>
                        content
                    </p>
                    <div className={styles["right-side"]}>
                        {/* if owner */}
                        <button className={styles["delete-btn"]}>Delete</button>
                        <span className={styles["timestamp"]}>date</span>
                    </div>
                </div>
            </div >
        </li >
    )
}
