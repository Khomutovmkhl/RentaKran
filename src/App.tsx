import './index.css';
import {MapPin} from 'lucide-react';
import logo from "./assets/logo-icon-blue.jpg";
import heroBg from "./assets/hero-bg.jpg";
import PhoneLink from "./components/PhoneLink.tsx";
import CraneSlider from "./components/CraneSlider";
import CookieBanner from './components/CookieBanner';

// Импорт ВСЕХ фото кранов
import crane_kamaz_1 from "./assets/cranes/KAMAZ_1.png";
import crane_kamaz_2 from "./assets/cranes/KAMAZ_2.png";
import crane_maz_1 from "./assets/cranes/MAZ_1.jpg";
import crane_maz_2 from "./assets/cranes/MAZ_2.jpg";
import YandexMap from "./components/YandexMap.tsx";

function App() {
    const cranes = [
        {
            id: 1,
            model: 'КАМАЗ КС-55729-1В',
            capacity: '32',
            boom: '31',
            images: [crane_kamaz_1, crane_kamaz_2],
            price: 3000
        },
        {id: 2, model: 'МАЗ КС-5576Б', capacity: '32', boom: '31', images: [crane_maz_1, crane_maz_2], price: 3000}
    ];
    const principalPhoneView: string = "+7 902 330 35-90";
    const principalPhone: string = "+79023303590";
    const mail: string = "almh@bk.ru";
    const legalName: string = "ООО «РентаКран»";
    const ogrn: number = 1137604005560;
    const inn: number = 7604241724;
    const legalAddress: string = "обл. Ярославская, г. Ярославль, ул. Леваневского, д. 71";


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
                fetchPriority="high"  // Атрибут для браузера (SEO/LCP)
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container">
                    <h1 className="hero-title">Аренда автокрана в Ярославле от 3000 руб/час</h1>
                    <p className="hero-subtitle">
                        Профессиональная техника, опытные операторы, гибкие условия аренды.
                    </p>
                </div>
            </section>

            {/* ===== КАТАЛОГ КРАНОВ ===== */}
            <section id="cranes" className="section">
                <div className="container">
                    <h2 className="section-title">Каталог автокранов в аренду</h2>
                    <div className="cranes-grid">
                        {cranes.map(crane => (
                            <article
                                key={crane.id}
                                className="crane-card"
                                itemScope
                                itemType="https://schema.org">
                                <meta itemProp="name" content={`Аренда автокрана ${crane.model}`}/>
                                <meta itemProp="description"
                                      content={`Услуги автокрана ${crane.capacity} тонн с вылетом стрелы ${crane.boom} метров в Ярославле.`}/>

                                <CraneSlider images={crane.images} model={crane.model}/>

                                <div className="crane-info">
                                    <h3 className="crane-model">{crane.model}</h3>
                                    <ul className="crane-specs">
                                        <li itemProp="additionalProperty" itemScope itemType="https://schema.org">
                                            <strong itemProp="name">Грузоподъёмность, т:</strong>
                                            <span itemProp="value">{crane.capacity}</span>
                                        </li>
                                        <li itemProp="additionalProperty" itemScope itemType="https://schema.org">
                                            <strong itemProp="name">Вылет стрелы, м:</strong>
                                            <span itemProp="value">{crane.boom}</span>
                                        </li>
                                        <li itemProp="additionalProperty" itemScope itemType="https://schema.org">
                                            <strong itemProp="name">Цена аренды, р/час:</strong>
                                            <span itemProp="value">{crane.price}</span>
                                        </li>
                                    </ul>

                                    <div itemProp="offers" itemScope itemType="https://schema.org">
                                        <meta itemProp="price" content={`${crane.price}`}/>
                                        <meta itemProp="priceCurrency" content="RUB"/>
                                        <link itemProp="availability" href="https://schema.org"/>
                                    </div>

                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <a href={`tel:${principalPhone}`} className="phone-button"
                                           style={{width: '100%', justifyContent: 'center'}}>Позвонить</a>
                                        <a href={`sms:${principalPhone}?text=${encodeURIComponent(`Интересует кран ${crane.model}`)}`}
                                           className="sms-button"
                                           style={{width: '100%', justifyContent: 'center'}}>Написать</a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== КОНТАКТЫ ===== */}
            <section
                id="contacts"
                className="section contacts"
                itemScope
                itemType="https://schema.org"
            >
                <meta itemProp="name" content={legalName}/>
                <div className="container">
                    <h3 className="section-title">Контактная информация и адрес</h3>
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

                        <div className="contact-card" style={{padding: 0, overflow: 'hidden', display: 'flex'}}>
                            <YandexMap/>
                            <meta itemProp="addressLocality" content="Ярославль"/>
                        </div>
                        <meta itemProp="addressLocality" content="Ярославль"/>

                        <div className="contact-card">
                            <h2>Режим работы</h2>
                            <meta itemProp="openingHours" content="Mo-Su 00:00-24:00"/>
                            <p style={{margin: '1rem 0'}}>Пн-Вс: круглосуточно</p>
                            <p style={{margin: '1rem 0'}}>
                                Работаем по всей области</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ФУТЕР ===== */}
            <footer className="footer">
                <div className="footer-container">

                    {/* Блок с основной информацией */}
                    <div className="footer-main">
                        <p style={{fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold'}}>
                            {legalName}
                        </p>
                        <p>© {new Date().getFullYear()} Все права защищены</p>
                        <p style={{marginTop: '1rem', opacity: 0.8}}>Ярославль, Россия</p>
                    </div>

                    {/* Блок с реквизитами */}
                    <div className="footer-legal">
                        <p><strong>Реквизиты компании:</strong></p>
                        <p>ОГРН: {ogrn}</p>
                        <p>ИНН: {inn}</p>
                        <p>Юр. адрес: {legalAddress}</p>
                    </div>

                    {/* Блок контактов */}
                    <div className="footer-contact">
                        <p><strong>Контакты:</strong></p>
                        <p>
                            Телефон:{' '}
                            <a href={`tel:${principalPhone}`} style={{color: '#ddd', textDecoration: 'none'}}>
                                {principalPhoneView}
                            </a>
                        </p>
                        <p>
                            Email:{' '}
                            <a href={`mailto:${mail}`} style={{color: '#ddd', textDecoration: 'none'}}>
                                {mail}
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
            <CookieBanner/>
        </div>
    );
}

export default App;