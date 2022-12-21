import styles from './Page404.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Page404 = () => {
    return (
        <section className={styles['page-not-found']}>
            <h1>404</h1>
            <div className={styles['text']}>
                Page Not Found
            </div>
            <Link to="/" className={styles['home-link']}>
                <span className={styles['home-link-content']}>
                    Go Home
                </span>
            </Link>
        </section>
    )
}
