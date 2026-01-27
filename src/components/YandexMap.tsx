import { useEffect, useRef, useState } from 'react';

const YandexMap = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false); // Флаг: пора ли грузить карту

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Если блок карты появился в области видимости (или в 400px от неё)
                if (entries[0].isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect(); // Перестаем следить после первой загрузки
                }
            },
            { rootMargin: '400px' } // Начнет загрузку заранее, за 400px до скролла к блоку
        );

        if (mapContainer.current) {
            observer.observe(mapContainer.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Загружаем скрипт только когда isLoaded стал true
        if (isLoaded && mapContainer.current && mapContainer.current.children.length === 0) {
            const script = document.createElement('script');
            script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad6f0b97e6756f12b93427e81a8ee7bc5ec2f58f68aa20d71da8c4a2f66dcb8e3&amp;width=100%25&amp;height=100%25&amp;lang=ru_RU&amp;scroll=true";
            script.type = "text/javascript";
            script.charset = "utf-8";
            script.async = true;
            mapContainer.current.appendChild(script);
        }
    }, [isLoaded]);

    return (
        <div
            ref={mapContainer}
            style={{
                width: '100%',
                height: '100%',
                minHeight: '200px', // Укажите реальную высоту, чтобы страница не «прыгала»
                backgroundColor: '#f0f0f0' // Заглушка, пока карта грузится
            }}
        />
    );
};

export default YandexMap;
