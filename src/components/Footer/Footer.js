import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer>
            <div>
                <p className={styles['bottom']}>All rights reserved | Copyright &copy; {new Date().getFullYear()} </p>
            </div>
        </footer>
    );
}