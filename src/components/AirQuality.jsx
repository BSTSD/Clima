import React, { useEffect, useState } from 'react';

const AirQuality = ({ lat, lon }) => {
    const [airQuality, setAirQuality] = useState(null);
    const API_KEY = '4d8fb5b93d4af21d66a2948710284366';

    useEffect(() => {
        const fetchAirQuality = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
                );
                const data = await response.json();
                setAirQuality(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAirQuality();
    }, [lat, lon]);

    return (
        <div className="air-quality">
            <h3>Calidad del Aire</h3>
            {airQuality && (
                <div className="air-quality-info">
                    <p>Índice: {airQuality.list[0].main.aqi}</p>
                    {/* Más detalles aquí */}
                </div>
            )}
        </div>
    );
};

export default AirQuality; 