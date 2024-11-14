import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
    const getWeatherIcon = (code) => {
        const icons = {
            '01d': 'fas fa-sun',
            '01n': 'fas fa-moon',
            '02d': 'fas fa-cloud-sun',
            '02n': 'fas fa-cloud-moon',
            '03d': 'fas fa-cloud',
            '03n': 'fas fa-cloud',
            '04d': 'fas fa-cloud',
            '04n': 'fas fa-cloud',
            '09d': 'fas fa-cloud-rain',
            '09n': 'fas fa-cloud-rain',
            '10d': 'fas fa-cloud-showers-heavy',
            '10n': 'fas fa-cloud-showers-heavy',
            '11d': 'fas fa-bolt',
            '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake',
            '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog',
            '50n': 'fas fa-smog'
        };
        return icons[code] || 'fas fa-question';
    };

    return (
        <div className="weather-card">
            <div className="weather-main">
                <div className="weather-info">
                    <h2 className="location">
                        <i className="fas fa-map-marker-alt"></i>
                        {data.name}, {data.sys.country}
                    </h2>
                    <div className="temperature">
                        <i className={getWeatherIcon(data.weather[0].icon)}></i>
                        {Math.round(data.main.temp)}°C
                    </div>
                    <div className="weather-description">
                        {data.weather[0].description}
                    </div>
                </div>
                <div className="current-details">
                    <div className="detail-item">
                        <i className="fas fa-temperature-high"></i>
                        <span>Sensación térmica</span>
                        <span>{Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div className="detail-item">
                        <i className="fas fa-tint"></i>
                        <span>Humedad</span>
                        <span>{data.main.humidity}%</span>
                    </div>
                    <div className="detail-item">
                        <i className="fas fa-wind"></i>
                        <span>Viento</span>
                        <span>{Math.round(data.wind.speed * 3.6)} km/h</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
