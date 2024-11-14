import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecast }) => {
    const getWeatherIcon = (code) => {
        const icons = {
            // Soleado
            0: <i className="fas fa-sun weather-icon sunny"></i>,
            // Parcialmente nublado
            1: <i className="fas fa-cloud-sun weather-icon partly-cloudy"></i>,
            // Nublado
            2: <i className="fas fa-cloud weather-icon cloudy"></i>,
            // Lluvia
            3: <i className="fas fa-cloud-rain weather-icon rainy"></i>,
            // Nieve
            4: <i className="fas fa-snowflake weather-icon snowy"></i>,
            // Tormenta
            5: <i className="fas fa-bolt weather-icon stormy"></i>
        };
        return icons[code] || icons[0];
    };

    return (
        <div className="forecast-section">
            <h3 className="forecast-title">Próximos días</h3>
            <div className="forecast-container">
                {forecast.map((day, index) => (
                    <div key={index} className="forecast-day">
                        <div className="day-name">{day.date}</div>
                        <i className={`weather-icon ${getWeatherIcon(day.weatherCode)}`}></i>
                        <div className="temp-range">
                            <span className="max-temp">{Math.round(day.maxTemp)}°</span>
                            <span className="min-temp">{Math.round(day.minTemp)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard; 