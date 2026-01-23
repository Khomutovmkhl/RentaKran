import React, { useState } from 'react';

const CookieBanner: React.FC = () => {
    // Инициализируем состояние сразу из localStorage
    const [isVisible, setIsVisible] = useState(() => {
        const consent = localStorage.getItem('cookie-consent');
        return !consent;
    });

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={styles.banner}>
            <div style={styles.content}>
                <p style={styles.text}>
                    Мы используем файлы cookie для работы Яндекс.Метрики.
                    Продолжая работу, вы соглашаетесь с{' '}
                    <a href="/privacy.pdf" target="_blank" style={styles.link} rel={"nofollow"}>политикой конфиденциальности</a>.
                </p>
                <button onClick={handleAccept} style={styles.button}>
                    ОК
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    banner: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '15px 0',
        zIndex: 10000,
        boxShadow: '0 -4px 10px rgba(0,0,0,0.2)',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
    },
    text: {
        fontSize: '14px',
        margin: 0,
        lineHeight: '1.4'
    },
    link: {
        color: '#3498db',
        textDecoration: 'underline'
    },
    button: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '10px 25px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background 0.2s'
    }
};

export default CookieBanner;
