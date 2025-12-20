'use client';

import { useState } from 'react';
import styles from './IpForm.module.css';

interface IpFormProps {
    onSubmit: (ip: string) => void;
    loading: boolean;
}

export default function IpForm({ onSubmit, loading }: IpFormProps) {
    const [ip, setIp] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ip.trim() || ip === '') {
            onSubmit(ip);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="Введите IP-адрес (например: 8.8.8.8) или оставьте пустым"
                    className={styles.input}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? 'Загрузка...' : 'Получить информацию'}
                </button>
            </div>

            <div className={styles.examples}>
                <p className={styles.examplesTitle}>Примеры IP-адресов:</p>
                <div className={styles.examplesList}>
                    <button
                        type="button"
                        onClick={() => setIp('8.8.8.8')}
                        className={styles.exampleButton}
                    >
                        Google DNS (8.8.8.8)
                    </button>
                    <button
                        type="button"
                        onClick={() => setIp('1.1.1.1')}
                        className={styles.exampleButton}
                    >
                        Cloudflare (1.1.1.1)
                    </button>
                    <button
                        type="button"
                        onClick={() => setIp('')}
                        className={styles.exampleButton}
                    >
                        Мой IP
                    </button>
                </div>
            </div>
        </form>
    );
}