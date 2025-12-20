'use client';

import { IpInfo } from '@/lib/types';
import styles from './IpInfoCard.module.css';

interface IpInfoCardProps {
    data: IpInfo;
}

export default function IpInfoCard({ data }: IpInfoCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>Информация об IP: {data.ip}</h2>
                <span className={styles.badge}>
          {data.hostname || 'Хостнейм недоступен'}
        </span>
            </div>

            <div className={styles.grid}>
                <div className={styles.infoItem}>
                    <span className={styles.label}>Страна</span>
                    <span className={styles.value}>
            {data.country} {data.country_name ? `(${data.country_name})` : ''}
          </span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Регион/Город</span>
                    <span className={styles.value}>
            {data.region}, {data.city}
          </span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Координаты</span>
                    <span className={styles.value}>
            {data.loc || 'Не доступно'}
          </span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Провайдер (ISP)</span>
                    <span className={styles.value}>{data.org}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Часовой пояс</span>
                    <span className={styles.value}>{data.timezone}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Почтовый индекс</span>
                    <span className={styles.value}>{data.postal || 'Не доступно'}</span>
                </div>
            </div>

            <div className={styles.mapLink}>
                {data.loc && (
                    <a
                        href={`https://maps.google.com/?q=${data.loc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapButton}
                    >
                        📍 Посмотреть на карте
                    </a>
                )}
            </div>
        </div>
    );
}