import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SeasonalBackground from './components/SeasonalBackground';
import DynamicBackground from './components/DynamicBackground';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDay, setIsDay] = useState(true);

    // Función para obtener ubicación por IP
    const getLocationByIP = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                city: data.city,
                country: data.country_name,
                lat: data.latitude,
                lon: data.longitude
            };
        } catch (error) {
            console.error('Error obteniendo ubicación por IP:', error);
            return null;
        }
    };

    // Función para obtener el clima por coordenadas
    const getWeatherByCoords = async (lat, lon) => {
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=es`
            );

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=es`
            );

            const weatherResult = await weatherResponse.json();
            const forecastResult = await forecastResponse.json();

            setWeatherData(weatherResult);
            setForecastData(processForecastData(forecastResult.list));
            setLoading(false);
        } catch (err) {
            setError('Error al obtener datos del clima');
            setLoading(false);
        }
    };

    // Función para obtener el clima por nombre de ciudad
    const handleCityChange = async (cityData) => {
        try {
            setLoading(true);
            setError(null);

            // Usar las coordenadas para obtener el clima
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=es`
            );

            if (!weatherResponse.ok) {
                throw new Error('Ciudad no encontrada');
            }

            const weatherResult = await weatherResponse.json();

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=es`
            );

            const forecastResult = await forecastResponse.json();

            setWeatherData(weatherResult);
            setForecastData(processForecastData(forecastResult.list));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cargar ubicación inicial por IP
    useEffect(() => {
        const loadInitialLocation = async () => {
            const location = await getLocationByIP();
            if (location) {
                await getWeatherByCoords(location.lat, location.lon);
            } else {
                setError('No se pudo obtener tu ubicación');
                setLoading(false);
            }
        };

        loadInitialLocation();
    }, []);

    // Función para procesar datos del pronóstico
    const processForecastData = (forecastList) => {
        const dailyData = [];
        const processedDates = new Set();

        forecastList.forEach(forecast => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString();

            if (!processedDates.has(date)) {
                processedDates.add(date);
                dailyData.push({
                    date: date,
                    maxTemp: Math.round(forecast.main.temp_max),
                    minTemp: Math.round(forecast.main.temp_min),
                    weatherCode: getWeatherCode(forecast.weather[0].id),
                    precipitation: Math.round(forecast.pop * 100)
                });
            }
        });

        return dailyData.slice(1, 8); // Retorna próximos 7 días
    };

    // Función para mapear códigos de clima
    const getWeatherCode = (apiWeatherCode) => {
        if (apiWeatherCode >= 200 && apiWeatherCode < 300) return 5; // Tormenta
        if (apiWeatherCode >= 300 && apiWeatherCode < 500) return 3; // Lluvia ligera
        if (apiWeatherCode >= 500 && apiWeatherCode < 600) return 3; // Lluvia
        if (apiWeatherCode >= 600 && apiWeatherCode < 700) return 4; // Nieve
        if (apiWeatherCode >= 700 && apiWeatherCode < 800) return 2; // Atmósfera
        if (apiWeatherCode === 800) return 0; // Despejado
        if (apiWeatherCode > 800) return 1; // Parcialmente nublado
        return 0;
    };

    // Función para verificar si es de día o noche
    const checkDayTime = () => {
        const hours = new Date().getHours();
        setIsDay(hours >= 6 && hours < 20);
    };

    // Actualizar clima en tiempo real
    useEffect(() => {
        // Verificar hora del día
        checkDayTime();
        const dayInterval = setInterval(checkDayTime, 60000); // Verificar cada minuto

        // Actualizar clima cada 5 minutos
        const weatherInterval = setInterval(() => {
            if (weatherData) {
                const { lat, lon } = weatherData.coord;
                getWeatherByCoords(lat, lon);
            }
        }, 300000); // 5 minutos

        return () => {
            clearInterval(dayInterval);
            clearInterval(weatherInterval);
        };
    }, [weatherData]);

    return (
        <div className="app-container">
            <DynamicBackground
                weatherCode={weatherData?.weather[0]?.icon?.slice(0, -1)}
                isDay={isDay}
            />
            <div className="content-wrapper">
                <h1 className="app-title">Clima Mundial</h1>
                <SearchBar onCityChange={handleCityChange} />
                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Obteniendo datos del clima...</p>
                    </div>
                )}
                {error && <div className="error-message">{error}</div>}
                {weatherData && !loading && (
                    <>
                        <WeatherCard data={weatherData} />
                        {forecastData && <ForecastCard forecast={forecastData} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
