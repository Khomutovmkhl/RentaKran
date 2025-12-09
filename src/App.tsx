import './index.css';
// import {Phone, MapPin, Mail, Clock} from 'lucide-react';
import {Phone} from 'lucide-react';
import logo from "./assets/logo-icon-blue.jpg";

function App() {
    // Данные о кранах (временно заглушка)
    const cranes = [
        {id: 1, model: 'Liebherr LTM 1100', capacity: '100 тонн', boom: '48 м', year: '2020'},
        {id: 2, model: 'XCMG QY100K', capacity: '100 тонн', boom: '44 м', year: '2021'},
        {id: 3, model: 'Grove GMK5110', capacity: '110 тонн', boom: '50 м', year: '2019'},
        {id: 4, model: 'Tadano ATF 110G', capacity: '110 тонн', boom: '45 м', year: '2022'},
    ];

    return (
        <div className="app">
            {/* ===== ШАПКА ===== */}
            <header className="header">
                <div className="container header-content">
                    <div className="logo">
                        <img src={logo} alt="Логотип РентаКран"/>
                    </div>

                    <nav>
                        <ul className="nav-links">
                            <li><a href="#cranes">Автокраны</a></li>
                            <li><a href="#contacts">Контакты</a></li>
                        </ul>
                    </nav>

                    <a href="tel:+79109696260" className="phone-button">
                        <Phone size={20}/> +7 910 969-62-60
                    </a>
                </div>
            </header>

            {/* ===== ГЛАВНЫЙ ЭКРАН ===== */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">Аренда автокранов в Ярославле</h1>
                    <p className="hero-subtitle">
                        Профессиональная техника, опытные операторы, гибкие условия аренды.
                    </p>
                    {/*<a href="#contacts" className="phone-button" style={{fontSize: '1.2rem', padding: '1rem 2rem'}}>*/}
                    {/*    Заказать звонок*/}
                    {/*</a>*/}
                </div>
            </section>

            {/* ===== КАТАЛОГ КРАНОВ ===== */}
            <section id="cranes" className="section">
                <div className="container">
                    <h2 className="section-title">Наши краны</h2>
                    <div className="cranes-grid">
                        {cranes.map(crane => (
                            <div key={crane.id} className="crane-card">
                                <div className="crane-image">
                                    {/* Заглушка для фото */}
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: '#1e40af',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem'
                                    }}>
                                        🏗️
                                    </div>
                                </div>
                                <div className="crane-info">
                                    <h3 className="crane-model">{crane.model}</h3>
                                    <ul className="crane-specs">
                                        <li><strong>Грузоподъёмность:</strong> <span>{crane.capacity}</span></li>
                                        <li><strong>Вылет стрелы:</strong> <span>{crane.boom}</span></li>
                                        <li><strong>Год выпуска:</strong> <span>{crane.year}</span></li>
                                    </ul>
                                    <a href={`tel:+79109696260?text=Интересует%20кран%20${crane.model}`}
                                       className="phone-button" style={{width: '100%', justifyContent: 'center'}}>
                                        Узнать цену
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== КОНТАКТЫ ===== */}
            <section id="contacts" className="section contacts">
                <div className="container">
                    <h2 className="section-title">Контакты</h2>
                    <div className="contact-grid">
                        <div className="contact-card">
                            <div className="contact-icon">📞</div>
                            <h3>Телефон</h3>
                            <p style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0'}}>
                                +7 910 969-62-60
                            </p>
                            <p>Директор: Михаил</p>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">📍</div>
                            <h3>Адрес базы</h3>
                            <p style={{margin: '1rem 0'}}>
                                Ярославль, ул. Строителей, 10
                            </p>
                            <p>Работаем по всей области</p>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">⏰</div>
                            <h3>Режим работы</h3>
                            <p style={{margin: '1rem 0'}}>
                                Пн-Вс: круглосуточно
                            </p>
                            <p>Срочная подача техники</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ФУТЕР ===== */}
            <footer className="footer">
                <div className="container">
                    <p style={{fontSize: '1.2rem', marginBottom: '1rem'}}>РентаКран — аренда автокранов</p>
                    <p>© {new Date().getFullYear()} Все права защищены</p>
                    <p style={{marginTop: '1rem', opacity: 0.8}}>Ярославль, Россия</p>
                </div>
            </footer>
        </div>
    );
}

export default App;