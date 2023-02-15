import styles from './Page404.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';

export const Page404 = () => {
    useTitle('Page Error 404');

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
            <div className={styles.frame} >
                <div className={styles.modal}>
                    <div className={`${styles['post-container']} ${styles['post-container-with-form']}`} >
                        <button
                            type='button'
                            className={`${styles['btn-icon']}`}
                        >
                            <span className={styles['icon-message']}></span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
