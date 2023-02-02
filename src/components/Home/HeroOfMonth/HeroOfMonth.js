
import { Link } from 'react-router-dom';
import styles from './HeroOfMonth.module.css';

import React from 'react'

export const HeroOfMonth = ({ userId, userData }) => {
    return (
        <section className={styles.comment}>
            <div className={styles['container']}>
                <div className={styles['comment-content']}>
                    <Link to={`foreignProfile/${userId}`} className={styles['user-name']}>{userData.firstName} {userData.lastName}</Link>
                    <p className={styles.paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque repudiandae modi dolore iste similique reiciendis facilis quaerat doloribus nulla eligendi! Exercitationem nemo eveniet ut blanditiis minus reiciendis maxime, voluptatibus laborum!s</p>
                </div>
            </div>
        </section>
    )
}

