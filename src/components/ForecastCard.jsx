import React, { useEffect, useState } from 'react';

const ForecastCard = ({ city }) => {
    const [forecast, setForecast] = useState(null);
    const API_KEY = '4d8fb5b93d4af21d66a2948710284366';

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
                );
                const data = await response.json();
                setForecast(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchForecast();
    }, [city]);

    return (
        <div className="forecast-container">
            <h3>Pronóstico 5 días</h3>
            <div className="forecast-cards">
                {forecast?.list?.filter((item, index) => index % 8 === 0).map((day, index) => (
                    <div key={index} className="forecast-day">
                        <p>{new Date(day.dt * 1000).toLocaleDateString('es', { weekday: 'short' })}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                        />
                        <p className="temp">{Math.round(day.main.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard; 