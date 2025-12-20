'use client';

import { useState, useEffect } from 'react';
import IpForm from '@/app/components/IpForm';
import IpInfoCard from '@/app/components/IpInfoCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getIpInfo } from '@/lib/api';
import { IpInfo } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './IpInfo.module.css';

export default function IpInfoPage() {
    const [ipAddress, setIpAddress] = useState<string>('');
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [history, setHistory] = useLocalStorage<IpInfo[]>('ipHistory', []);

    const fetchIpInfo = async (ip: string = '') => {
        setLoading(true);
        setError('');

        try {
            const data = await getIpInfo(ip);
            setIpInfo(data);

            if (data && !history.some(item => item.ip === data.ip)) {
                const newHistory = [data, ...history.slice(0, 9)];
                setHistory(newHistory);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка при получении данных');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIpInfo();
    }, []);

    const handleSubmit = (ip: string) => {
        setIpAddress(ip);
        fetchIpInfo(ip);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Информация об IP-адресе</h1>
            <p className={styles.description}>
                Введите IP-адрес для получения информации или оставьте поле пустым для получения данных о вашем текущем IP.
            </p>

            <IpForm onSubmit={handleSubmit} loading={loading} />

            {loading && <LoadingSpinner />}

            {error && (
                <div className={styles.error}>
                    <p>Ошибка: {error}</p>
                </div>
            )}

            {ipInfo && (
                <>
                    <IpInfoCard data={ipInfo} />

                    <div className={styles.historyPreview}>
                        <h3 className={styles.historyTitle}>Недавние запросы</h3>
                        {history.length > 0 ? (
                            <div className={styles.historyList}>
                                {history.slice(0, 3).map((item) => (
                                    <div key={item.ip} className={styles.historyItem}>
                                        <span className={styles.historyIp}>{item.ip}</span>
                                        <span className={styles.historyLocation}>
                      {item.city}, {item.country}
                    </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noHistory}>История запросов пуста</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}