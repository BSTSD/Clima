import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WeatherCard.css';

const WeatherCard = ({ coordinates }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { city } = useParams();
    const API_KEY = '4d8fb5b93d4af21d66a2948710284366';

    useEffect(() => {
        const fetchWeather = async () => {
            if (!coordinates?.lat || !coordinates?.lon) {
                setWeatherData(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric&lang=es`
                );

                if (!response.ok) {
                    throw new Error('Error al obtener el clima');
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                console.error('Error:', err);
                setError('No se pudo cargar la información del clima');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [coordinates]);

    if (loading) {
        return (
            <div className="weather-card">
                <div className="loading">Cargando información del clima...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="weather-card">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (!weatherData || !coordinates) {
        return (
            <div className="weather-card">
                <div className="loading">
                    Busca una ciudad para ver el clima
                </div>
            </div>
        );
    }

    return (
        <div className="weather-card">
            <h2>{city || coordinates.name}</h2>
            <div className="temperature">
                {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="description">
                {weatherData.weather[0].description}
            </div>
            <div className="details">
                <div>Humedad: {weatherData.main.humidity}%</div>
                <div>Viento: {Math.round(weatherData.wind.speed * 3.6)} km/h</div>
            </div>
        </div>
    );
};

export default WeatherCard;
