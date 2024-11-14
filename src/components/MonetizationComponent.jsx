import React from 'react';

const MonetizationComponent = ({ weather }) => {
    // Productos genéricos con enlaces directos a tiendas
    const getRecommendations = () => {
        switch (weather.main) {
            case 'Rain':
                return [
                    {
                        name: 'Paraguas Plegable',
                        price: '15-20€',
                        description: 'Ideal para días lluviosos',
                        stores: [
                            'Decathlon',
                            'El Corte Inglés',
                            'Carrefour'
                        ]
                    },
                    // más productos...
                ];
            case 'Clear':
                return [
                    {
                        name: 'Protector Solar',
                        price: '10-15€',
                        description: 'Protección UV necesaria',
                        stores: [
                            'Primor',
                            'Douglas',
                            'Sephora'
                        ]
                    },
                    // más productos...
                ];
            // más casos...
        }
    };

    return (
        <div className="recommendations">
            <h3>Productos Recomendados para este Clima</h3>
            <div className="products-grid">
                {getRecommendations().map((product, index) => (
                    <div key={index} className="product-card">
                        <h4>{product.name}</h4>
                        <p className="price">{product.price}</p>
                        <p>{product.description}</p>
                        <div className="stores">
                            <h5>Disponible en:</h5>
                            <ul>
                                {product.stores.map((store, idx) => (
                                    <li key={idx}>{store}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonetizationComponent; 