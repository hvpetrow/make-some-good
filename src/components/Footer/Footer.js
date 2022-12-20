import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <p className={styles['footer-content']}>All rights reserved | Hristo Petrov | Copyright &copy; {new Date().getFullYear()}</p>
            <a className={styles['footer-link']} href="https://softuni.bg/">Software University</a>
        </footer>
    );
}