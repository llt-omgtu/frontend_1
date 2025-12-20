'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'IP Информация', href: '/ipinfo' },
    { label: 'История', href: '/history' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/" className={styles.logoLink}>
                        🌐 IP Info
                    </Link>
                </div>

                <nav className={styles.desktopNav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${
                                pathname === item.href ? styles.active : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    className={styles.mobileMenuButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Меню"
                >
                    <span className={styles.menuIcon}></span>
                    <span className={styles.menuIcon}></span>
                    <span className={styles.menuIcon}></span>
                </button>

                {isMenuOpen && (
                    <div className={styles.mobileMenu}>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.mobileNavLink} ${
                                    pathname === item.href ? styles.active : ''
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}