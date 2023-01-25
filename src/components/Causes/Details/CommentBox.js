import React from 'react'

import styles from './CommentBox.module.css';

export default function CommentBox({ comments, isShowedComments }) {
    return (
        <section id={styles["comments"]}>
            <div className={styles["comments-info"]}>
                <ul className={styles["noBullet"]}>
                    {/* if showedcomments */}
                    {isShowedComments &&
                        <>
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
                                    onClick={postComment}
                                    id={styles["post-btn"]}
                                >
                                    Post Comment
                                </button>
                            </li>
                        </>
                    }
                    {/* comments.map... */}
                </ul >
            </div >
        </section >
    )
}
