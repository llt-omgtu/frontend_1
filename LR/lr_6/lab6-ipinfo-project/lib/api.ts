import { IpInfo } from './types';

const API_TOKEN = 'e45636fa74f7a0';
const BASE_URL = 'https://ipinfo.io';

export async function getIpInfo(ip: string = ''): Promise<IpInfo> {
    const url = ip
        ? `${BASE_URL}/${ip}/json?token=${API_TOKEN}`
        : `${BASE_URL}/json?token=${API_TOKEN}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    const data = await response.json();

    return {
        ...data,
        timestamp: new Date().toISOString(),
    };
}