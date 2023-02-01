import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles['footer']}>

            <p className={styles['footer-content']}>Copyright &copy; {new Date().getFullYear()} | Hristo Petrov</p>
            <p className={styles['footer-content']}>All rights reserved</p>
            <a className={styles['footer-link']} href="https://softuni.bg/">Software University</a>
        </footer>
    );
}