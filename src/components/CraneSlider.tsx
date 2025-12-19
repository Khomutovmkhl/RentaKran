import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CraneSlider.css';

interface CraneSliderProps {
    images: string[];
    model: string;
}

export default function CraneSlider({ images, model }: CraneSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null); // ← Добавляем ref

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setImageLoaded(false); // Сбрасываем статус загрузки для нового фото
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setImageLoaded(false);
    };

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const isLandscape = img.naturalWidth > img.naturalHeight;

        // Добавляем класс в зависимости от ориентации
        if (isLandscape) {
            img.classList.add('landscape');
            img.classList.remove('portrait');
        } else {
            img.classList.add('portrait');
            img.classList.remove('landscape');
        }

        setImageLoaded(true);
    };

    const toggleFullscreen = () => {
        if (!sliderRef.current) return;

        if (!document.fullscreenElement) {
            sliderRef.current.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    // Автопереключение (каждые 5 секунд)
    // useEffect(() => {
    //   if (images.length <= 1) return;

    //   const interval = setInterval(() => {
    //     setCurrentIndex((prev) => (prev + 1) % images.length);
    //     setImageLoaded(false);
    //   }, 5000);

    //   return () => clearInterval(interval);
    // }, [images.length]);

    // Если нет изображений
    if (!images || images.length === 0) {
        return (
            <div className="crane-slider-placeholder">
                <div className="placeholder-icon">🏗️</div>
                <div className="placeholder-text">Фото крана</div>
            </div>
        );
    }

    return (
        <div className="crane-slider" ref = {sliderRef}>
            {/* Контейнер для изображения */}
            <div className="slider-container">
                <div className="slider-image-wrapper">
                    <img
                        src={images[currentIndex]}
                        alt={`${model} - фото ${currentIndex + 1}`}
                        className={`slider-image ${imageLoaded ? 'loaded' : 'loading'}`}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><text x="50" y="60" font-family="Arial" font-size="14" fill="%2394a3b8" text-anchor="middle">Фото не загрузилось</text></svg>';
                        }}
                    />
                </div>

                {/* Индикатор загрузки */}
                {!imageLoaded && (
                    <div className="image-loading">
                        <div className="loading-spinner"></div>
                        <span>Загрузка...</span>
                    </div>
                )}

                {/* Навигация (только если больше 1 фото) */}
                {images.length > 1 && (
                    <>
                        {/* Стрелки */}
                        <button
                            className="slider-btn slider-btn-prev"
                            onClick={prevSlide}
                            aria-label="Предыдущее фото"
                            type="button"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            className="slider-btn slider-btn-next"
                            onClick={nextSlide}
                            aria-label="Следующее фото"
                            type="button"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Точки-индикаторы */}
                        <div className="slider-dots">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setImageLoaded(false);
                                    }}
                                    aria-label={`Перейти к фото ${index + 1}`}
                                    type="button"
                                />
                            ))}
                        </div>

                        {/* Счётчик */}
                        <div className="slider-counter">
                            {currentIndex + 1} / {images.length}
                        </div>

                        {/* Кнопка fullscreen (опционально) */}
                        <button
                            className="slider-fullscreen"
                            onClick={() => {toggleFullscreen()}}
                            aria-label="Полный экран"
                            type="button"
                        >
                            🔍
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}