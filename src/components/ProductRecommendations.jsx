import React from 'react';
import './ProductRecommendations.css';

const ProductRecommendations = ({ weather = 'Clear' }) => {
    const getWeatherProducts = () => {
        const products = {
            Rain: [
                {
                    id: 1,
                    name: 'Paraguas Plegable Automático',
                    price: '12.99€',
                    description: 'Paraguas resistente al viento con apertura automática',
                    image: 'https://via.placeholder.com/150?text=Paraguas',
                    tags: ['Impermeable', 'Compacto', 'Automático']
                },
                {
                    id: 2,
                    name: 'Chubasquero Ligero',
                    price: '15.99€',
                    description: 'Impermeable plegable con capucha',
                    image: 'https://via.placeholder.com/150?text=Chubasquero',
                    tags: ['Ligero', 'Plegable', 'Unisex']
                }
            ],
            Clear: [
                {
                    id: 3,
                    name: 'Gafas de Sol Polarizadas',
                    price: '9.99€',
                    description: 'Protección UV400 con diseño moderno',
                    image: 'https://via.placeholder.com/150?text=Gafas',
                    tags: ['UV400', 'Polarizadas', 'Ligeras']
                },
                {
                    id: 4,
                    name: 'Protector Solar SPF50',
                    price: '8.99€',
                    description: 'Protección solar de amplio espectro',
                    image: 'https://via.placeholder.com/150?text=Protector',
                    tags: ['SPF50', 'Resistente al agua', 'No graso']
                }
            ],
            Snow: [
                {
                    id: 5,
                    name: 'Guantes Térmicos',
                    price: '11.99€',
                    description: 'Guantes con forro polar y pantalla táctil',
                    image: 'https://via.placeholder.com/150?text=Guantes',
                    tags: ['Térmicos', 'Táctiles', 'Impermeables']
                },
                {
                    id: 6,
                    name: 'Gorro de Invierno',
                    price: '7.99€',
                    description: 'Gorro de punto con forro polar',
                    image: 'https://via.placeholder.com/150?text=Gorro',
                    tags: ['Térmico', 'Suave', 'Unisex']
                }
            ],
            Clouds: [
                {
                    id: 7,
                    name: 'Chaqueta Ligera',
                    price: '19.99€',
                    description: 'Chaqueta cortavientos con capucha',
                    image: 'https://via.placeholder.com/150?text=Chaqueta',
                    tags: ['Ligera', 'Transpirable', 'Plegable']
                }
            ]
        };

        return products[weather] || products['Clear'];
    };

    return (
        <div className="product-recommendations">
            <h3 className="recommendations-title">
                Productos Recomendados para este Clima
            </h3>
            <div className="products-grid">
                {getWeatherProducts().map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <span className="price-tag">{product.price}</span>
                        </div>
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <div className="product-tags">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                            <button
                                className="view-button"
                                onClick={() => {
                                    alert('¡Próximamente disponible en AliExpress!');
                                }}
                            >
                                Ver en AliExpress
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations; 