import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

    const nextSlide = () => {
        setImageLoaded(false);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setImageLoaded(false);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

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
                <Gallery options={{ wheelToZoom: true, showHideAnimationType: 'fade' }}>
                    <div className="slider-image-wrapper">
                        {images.map((imgUrl, index) => (
                            <Item
                                key={index}
                                original={imgUrl}
                                thumbnail={imgUrl}
                                width="1600"
                                height="1200"
                            >
                                {({ ref, open }) => (
                                    <img
                                        ref={(node) => {
                                            // Если это текущая картинка и она уже в кеше
                                            if (index === currentIndex && node?.complete && !imageLoaded) {
                                                setImageLoaded(true);
                                            }
                                            // Передаем ref в Photoswipe (обязательно для всех элементов!)
                                            if (typeof ref === 'function') ref(node);
                                            else if (ref) (ref as any).current = node;
                                        }}
                                        onClick={open}
                                        src={imgUrl}
                                        alt={`${model} - фото ${index + 1}`}
                                        // Оставляем класс loaded только для текущей активной картинки
                                        className={`slider-image ${index === currentIndex && imageLoaded ? 'loaded' : 'loading'}`}
                                        // Запускаем handleImageLoad только для текущей картинки
                                        onLoad={index === currentIndex ? handleImageLoad : undefined}
                                        style={{
                                            cursor: 'zoom-in',
                                            // ВАЖНО: не return null, а display: none
                                            display: index === currentIndex ? 'block' : 'none'
                                        }}
                                        onError={(e) => {
                                            if (index === currentIndex) setImageLoaded(true);
                                            e.currentTarget.src = 'data:image/svg+xml,...';
                                        }}
                                    />
                                )}
                            </Item>
                        ))}
                    </div>
                </Gallery>

                {!imageLoaded && (
                    <div className="image-loading">
                        <div className="loading-spinner"></div>
                        <span>Загрузка...</span>
                    </div>
                )}

                {images.length > 1 && (
                    <>
                        <button
                            className="slider-btn slider-btn-prev"
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            type="button"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            className="slider-btn slider-btn-next"
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
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
                                        if (index !== currentIndex) {
                                            setImageLoaded(false);
                                            setCurrentIndex(index);
                                        }
                                    }}
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
