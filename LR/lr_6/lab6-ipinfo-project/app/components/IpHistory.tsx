'use client';

import { useEffect, useState } from 'react';
import { IpInfo } from '@/lib/types';
import styles from './IpHistory.module.css';

export default function IpHistory() {
    const [history, setHistory] = useState<IpInfo[]>([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('ipHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Ошибка:', e);
            }
        }
    }, []);

    const clearHistory = () => {
        if (confirm('Точно?')) {
            localStorage.removeItem('ipHistory');
            setHistory([]);
        }
    };

    const removeItem = (ip: string) => {
        const newHistory = history.filter(item => item.ip !== ip);
        localStorage.setItem('ipHistory', JSON.stringify(newHistory));
        setHistory(newHistory);
    };

    if (history.length === 0) {
        return (
            <div className={styles.empty}>
                <p>История запросов пуста</p>
                <p className={styles.emptySubtext}>
                   Запросов нету :(
                </p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Сохраненные запросы</h3>
                <button onClick={clearHistory} className={styles.clearButton}>
                    Очистить историю
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>IP-адрес</th>
                        <th>Местоположение</th>
                        <th>Провайдер</th>
                        <th>Время</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((item) => (
                        <tr key={item.ip}>
                            <td>
                                <span className={styles.ipCell}>{item.ip}</span>
                                {item.hostname && (
                                    <div className={styles.hostname}>{item.hostname}</div>
                                )}
                            </td>
                            <td>
                                <div className={styles.location}>
                                    <span className={styles.country}>{item.country_name || item.country}</span>
                                    <span className={styles.city}>
                      {item.city}, {item.region}
                    </span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.org}>{item.org}</div>
                            </td>
                            <td>
                                <div className={styles.timezone}>{item.timezone}</div>
                            </td>
                            <td>
                                <button
                                    onClick={() => removeItem(item.ip)}
                                    className={styles.deleteButton}
                                    title="Удалить из истории"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.stats}>
                Всего записей: <strong>{history.length}</strong>
            </div>
        </div>
    );
}