import React from 'react'

import styles from './CommentBox.module.css';

export default function CommentBox() {
    return (
        <section id={styles["comments"]}>
            <div className={styles["comments-info"]}>
                <ul className={styles["noBullet"]}>
                    {/* if showedcomments */}
                    {/* comments.map... */}
                    <li>
                        <textarea
                            id="content"
                            className={styles["inputFields"]}
                            name="content"
                            placeholder="..."
                            type="text"
                            required
                        ></textarea>
                    </li>
                    <li id="center-btn">
                        <button
                            //   click = post comment
                            id={styles["post-btn"]}
                        >
                            Post Comment
                        </button>
                    </li>
                </ul >
            </div >
        </section >
    )
}
