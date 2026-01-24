import { useState } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import './CraneSlider.css';

interface CraneSliderProps {
    images: string[];
    model: string;
}

export default function CraneSlider({ images, model }: CraneSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Переключение вперед
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setImageLoaded(false);
    };

    // Переключение назад
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setImageLoaded(false);
    };

    // Обработка загрузки изображения (ориентация и статус)
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const isLandscape = img.naturalWidth > img.naturalHeight;

        if (isLandscape) {
            img.classList.add('landscape');
            img.classList.remove('portrait');
        } else {
            img.classList.add('portrait');
            img.classList.remove('landscape');
        }
        setImageLoaded(true);
    };

    // Если нет изображений, выводим заглушку
    if (!images || images.length === 0) {
        return (
            <div className="crane-slider-placeholder">
                <div className="placeholder-icon">🏗️</div>
                <div className="placeholder-text">Фото крана отсутствуют</div>
            </div>
        );
    }

    return (
        <div className="crane-slider">
            <div className="slider-container">
                {/* Инициализируем PhotoSwipe Галерею */}
                {/* wheelToZoom: true включает масштабирование колесиком мыши */}
                <Gallery options={{ wheelToZoom: true, showHideAnimationType: 'fade' }}>
                    <div className="slider-image-wrapper">
                        {images.map((imgUrl, index) => (
                            <Item
                                key={index}
                                original={imgUrl}
                                thumbnail={imgUrl}
                                width="1600" // Рекомендуется передавать реальные размеры
                                height="1200"
                            >
                                {({ ref, open }) => (
                                    <img
                                        ref={ref as React.LegacyRef<HTMLImageElement>}
                                        onClick={open}
                                        src={imgUrl}
                                        alt={`${model} - фото ${index + 1}`}
                                        className={`slider-image ${index === currentIndex && imageLoaded ? 'loaded' : 'loading'}`}
                                        loading="lazy"
                                        onLoad={index === currentIndex ? handleImageLoad : undefined}
                                        style={{
                                            display: index === currentIndex ? 'block' : 'none',
                                            cursor: 'zoom-in'
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><text x="50" y="60" font-family="Arial" font-size="14" fill="%2394a3b8" text-anchor="middle">Ошибка загрузки</text></svg>';
                                        }}
                                    />
                                )}
                            </Item>
                        ))}
                    </div>
                </Gallery>

                {/* Индикатор загрузки текущего фото */}
                {!imageLoaded && (
                    <div className="image-loading">
                        <div className="loading-spinner"></div>
                        <span>Загрузка...</span>
                    </div>
                )}

                {/* Навигация (стрелки и точки) */}
                {images.length > 1 && (
                    <>
                        <button
                            className="slider-btn slider-btn-prev"
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            aria-label="Предыдущее фото"
                            type="button"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            className="slider-btn slider-btn-next"
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            aria-label="Следующее фото"
                            type="button"
                        >
                            <ChevronRight size={24} />
                        </button>

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

                        <div className="slider-counter">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
