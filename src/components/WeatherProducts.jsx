import React from 'react';
import './WeatherProducts.css';

const WeatherProducts = ({ weather }) => {
    // Productos recomendados según el clima
    const getProducts = () => {
        const conditions = {
            // Lluvia
            Rain: [
                {
                    name: 'Paraguas Plegable Automático',
                    price: '19.99',
                    image: 'umbrella.jpg',
                    link: 'https://www.amazon.es/dp/B07H2SKF7N?tag=tuwebclima-20'
                },
                {
                    name: 'Impermeable Ligero',
                    price: '24.99',
                    image: 'raincoat.jpg',
                    link: 'https://www.amazon.es/dp/B07JW9H4J1?tag=tuwebclima-20'
                }
            ],
            // Calor
            Clear: [
                {
                    name: 'Ventilador Portátil USB',
                    price: '15.99',
                    image: 'fan.jpg',
                    link: 'https://www.amazon.es/dp/B08CV7NLZ9?tag=tuwebclima-20'
                },
                {
                    name: 'Protector Solar SPF50',
                    price: '12.99',
                    image: 'sunscreen.jpg',
                    link: 'https://www.amazon.es/dp/B00BTFGGQ0?tag=tuwebclima-20'
                }
            ],
            // Frío
            Snow: [
                {
                    name: 'Guantes Táctiles de Invierno',
                    price: '16.99',
                    image: 'gloves.jpg',
                    link: 'https://www.amazon.es/dp/B07YY3B5NK?tag=tuwebclima-20'
                },
                {
                    name: 'Bufanda Térmica',
                    price: '14.99',
                    image: 'scarf.jpg',
                    link: 'https://www.amazon.es/dp/B07ZPC9QD4?tag=tuwebclima-20'
                }
            ]
        };

        return conditions[weather.main] || conditions['Clear'];
    };

    // Añade tracking de clics
    const trackProductClick = (productName) => {
        // Puedes usar Google Analytics o tu propio sistema
        if (window.gtag) {
            window.gtag('event', 'product_click', {
                'product_name': productName,
                'weather_condition': weather.main
            });
        }
    };

    return (
        <div className="weather-products">
            <h3>Productos Recomendados para Hoy</h3>
            <div className="products-grid">
                {getProducts().map((product, index) => (
                    <a
                        key={index}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-card"
                        onClick={() => trackProductClick(product.name)}
                    >
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p className="price">{product.price}€</p>
                        <button className="buy-button">
                            Ver en Amazon
                        </button>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default WeatherProducts; 