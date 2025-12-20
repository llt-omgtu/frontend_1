'use client';
import IpHistory from '@/app/components/IpHistory';
import styles from './History.module.css';

export default function HistoryPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>История запросов</h1>
            <p className={styles.description}>
                История запросов информации об IP
            </p>

            <IpHistory />
        </div>
    );
}