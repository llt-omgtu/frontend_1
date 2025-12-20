'use client';
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🌐</div>
                        <h3 className={styles.featureTitle}>Информация об IP</h3>
                        <p className={styles.featureText}>
                            Получайте подробную информацию о любом IP-адресе: местоположение, провайдер, часовой пояс.
                        </p>
                        <Link href="/ipinfo" className={styles.featureLink}>
                            Перейти →
                        </Link>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📊</div>
                        <h3 className={styles.featureTitle}>История запросов</h3>
                        <p className={styles.featureText}>
                            Просматривайте историю всех ваших запросов к API. Данные сохраняются локально в вашем браузере.
                        </p>
                        <Link href="/history" className={styles.featureLink}>
                            Перейти →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}