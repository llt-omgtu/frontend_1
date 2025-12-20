import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.title}>Навигация</h3>
                        <ul className={styles.links}>
                            <li><a href="/" className={styles.link}>Главная</a></li>
                            <li><a href="/ipinfo" className={styles.link}>IP Информация</a></li>
                            <li><a href="/history" className={styles.link}>История</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}