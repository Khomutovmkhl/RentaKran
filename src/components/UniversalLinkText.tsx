// UniversalLinkText.tsx
import React, {useState} from 'react';

type LinkBehavior = 'navigate' | 'openNewTab' | 'router' | 'custom';

interface UniversalLinkTextProps {
    /** URL или путь для навигации */
    to: string;
    /** Содержимое текста */
    children: React.ReactNode;
    /** Способ открытия ссылки */
    behavior?: LinkBehavior;
    /** Цвет при наведении (по умолчанию синий) */
    hoverColor?: string;
    /** Дополнительные классы CSS */
    className?: string;
    /** Стили */
    style?: React.CSSProperties;
    /** Функция для кастомной обработки клика */
    onClick?: (e: React.MouseEvent, url: string) => void;
    /** Для доступности */
    ariaLabel?: string;
}

const UniversalLinkText: React.FC<UniversalLinkTextProps> = ({
                                                                 to,
                                                                 children,
                                                                 behavior = 'navigate',
                                                                 hoverColor = '#2563eb',
                                                                 className = '',
                                                                 style,
                                                                 onClick,
                                                                 ariaLabel,
                                                             }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        // Вызываем кастомный обработчик, если есть
        if (onClick) {
            onClick(e, to);
            return;
        }

        switch (behavior) {
            case 'openNewTab':
                window.open(to, '_blank', 'noopener,noreferrer');
                break;
            case 'router':
                // Здесь можно интегрировать с react-router
                // window.history.pushState({}, '', to);
                break;
            case 'navigate':
            default:
                window.location.href = to;
                break;
        }
    };

    const baseStyle: React.CSSProperties = {
        cursor: 'pointer',
        color: isHovered ? hoverColor : 'inherit',
        textDecoration: isHovered ? 'underline' : 'none',
        transition: 'color 0.2s ease-in-out, text-decoration 0.2s ease-in-out',
        display: 'inline',
        ...style,
    };

    return (
        <span
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={baseStyle}
            className={`interactive-text ${className}`}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel || (typeof children === 'string' ? children : 'Ссылка')}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick(e as any);
                }
            }}
        >
    {children}
    </span>
    );
};

export default UniversalLinkText;