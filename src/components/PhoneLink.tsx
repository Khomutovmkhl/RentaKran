import React, { useState } from 'react';

interface PhoneLinkProps {
    phoneNumber: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    activeStyle?: React.CSSProperties;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({
                                                 phoneNumber,
                                                 children,
                                                 className = '',
                                                 style = {},
                                                 hoverStyle = { color: '#0066cc', textDecoration: 'underline' },
                                                 activeStyle = { color: '#004499' }
                                             }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isCopied] = useState(false);

    // Функция обработки клика
    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsActive(true);

        // ... код обработки звонка/копирования

        setTimeout(() => setIsActive(false), 200);
    };

    // Комбинируем стили
    const baseStyle: React.CSSProperties = {
        cursor: 'pointer',
        color: 'inherit',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        display: 'inline-block',
        ...style
    };

    const currentStyle = {
        ...baseStyle,
        ...(isHovered ? hoverStyle : {}),
        ...(isActive ? activeStyle : {})
    };

    return (
        <span className={`phone-link-wrapper ${className}`}>
      <a
          href={`tel:${phoneNumber}`}
          onClick={handleClick}
          style={currentStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          title={`Позвонить на ${phoneNumber}`}
      >
        {children || phoneNumber}
      </a>
            {isCopied && (
                <span style={{ marginLeft: '8px', color: 'green', fontSize: '0.9em' }}>
          ✓ Скопировано
        </span>
            )}
    </span>
    );
};

export default PhoneLink;