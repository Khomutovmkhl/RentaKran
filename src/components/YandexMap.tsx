import { useEffect, useRef } from 'react';

const YandexMap = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapContainer.current && mapContainer.current.children.length === 0) {
            const script = document.createElement('script');
            // В URL ставим width=100%25 и height=100%25
            script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad6f0b97e6756f12b93427e81a8ee7bc5ec2f58f68aa20d71da8c4a2f66dcb8e3&amp;width=100%25&amp;height=100%25&amp;lang=ru_RU&amp;scroll=true";
            script.type = "text/javascript";
            script.charset = "utf-8";
            script.async = true;
            mapContainer.current.appendChild(script);
        }
    }, []);

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '100%', minHeight: '200px' }} />
    );
};


export default YandexMap;
