import './index.css';
import {MapPin} from 'lucide-react';
import logo from "./assets/logo-icon-blue.jpg";
import heroBg from "./assets/hero-bg.jpg";
import PhoneLink from "./components/PhoneLink.tsx";
import CraneSlider from "./components/CraneSlider";
import UniversalLinkText from './components/UniversalLinkText';

// Импорт ВСЕХ фото кранов
import crane_kamaz_1 from "./assets/cranes/KAMAZ_1.jpg";
import crane_kamaz_2 from "./assets/cranes/KAMAZ-2.jpg";
import crane_maz_1 from "./assets/cranes/MAZ_1.jpg";
import crane_maz_2 from "./assets/cranes/MAZ_2.jpg";

function App() {
    const cranes = [
        {id: 1, model: 'КАМАЗ КС-55729', capacity: '32', boom: '31', images: [crane_kamaz_1, crane_kamaz_2]},
        {id: 2, model: 'МАЗ КС-5576Б', capacity: '32', boom: '31', images: [crane_maz_1, crane_maz_2]}
    ];
    const principalPhoneView: string = "+7 (4852) 90-35-90";
    const principalPhone: string = "+7(4852)903590";


    return (
        <div className="app">
            {/* ===== ШАПКА ===== */}
            <header className="header">
                <div className="container header-content">
                    <div className="header-main">
                        <div className="logo">
                            <img src={logo} alt="Логотип РентаКран"/>
                        </div>
                        <nav>
                            <ul className="nav-links">
                                <li><a href="#cranes">Наша Техника</a></li>
                                <li><a href="#contacts">Контакты</a></li>
                            </ul>
                        </nav>
                    </div>

                    {/* Локация и телефон отдельно */}
                    <div className="header-contacts">
                        <a href="#contacts" className="location-block">
                            <MapPin size={18}/>
                            <span>Ярославль</span>
                        </a>
                        <PhoneLink phoneNumber={principalPhone}>
                            {principalPhoneView}
                        </PhoneLink>
                    </div>
                </div>
            </header>

            {/* ===== ГЛАВНЫЙ ЭКРАН ===== */}
            <section
                className="hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container">
                    <h1 className="hero-title">Аренда автокранов в Ярославле</h1>
                    <p className="hero-subtitle">
                        Профессиональная техника, опытные операторы, гибкие условия аренды.
                    </p>
                </div>
            </section>

            {/* ===== КАТАЛОГ КРАНОВ ===== */}
            <section id="cranes" className="section">
                <div className="container">
                    <h2 className="section-title">Наши краны</h2>
                    <div className="cranes-grid">
                        {cranes.map(crane => (
                            <div key={crane.id} className="crane-card">
                                <CraneSlider images={crane.images} model={crane.model}/>

                                <div className="crane-info">
                                    <h3 className="crane-model">{crane.model}</h3>

                                    {/* Характеристики */}
                                    <ul className="crane-specs">
                                        <li>
                                            <strong>Грузоподъёмность, т:</strong>
                                            <span>{crane.capacity}</span>
                                        </li>
                                        <li>
                                            <strong>Вылет стрелы, м:</strong>
                                            <span>{crane.boom}</span>
                                        </li>
                                    </ul>

                                    {/* Кнопка */}
                                    <a
                                        href={`tel:${principalPhone}?text=Интересует кран ${crane.model}`}
                                        className="phone-button"
                                        style={{width: '100%', justifyContent: 'center'}}
                                    >
                                        Узнать цену и наличие
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
                            <h2>Телефон</h2>
                            <PhoneLink
                                phoneNumber={principalPhone}
                                style={{fontSize: '1.2rem', fontWeight: 'bold', margin: '1rem 0'}}>
                                {principalPhoneView}
                            </PhoneLink>
                            <p>Директор: Александр Михайлович Хомутов</p>
                        </div>

                        <div className="contact-card">
                            <h2>Адрес базы</h2>
                            <div
                                style={{margin: '1rem 0'}}
                            >
                                <UniversalLinkText
                                    to="https://yandex.ru/maps/org/rentakran/1747997236/?ll=39.889682%2C57.578861&z=17"
                                    hoverColor="#3b82f6"
                                >
                                    150066, Ярославская обл., Ярославль, ул. Леваневского, 71
                                </UniversalLinkText>
                            </div>
                            <p style={{margin: '1rem 0'}}>
                                Работаем по всей области</p>
                        </div>

                        <div className="contact-card">
                            <h2>Режим работы</h2>
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