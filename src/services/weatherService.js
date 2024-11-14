import { WEATHER_API_KEY } from '../config';

export const fetchWeatherData = async (coordinates, language = 'es') => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=${language}`
        );

        if (!response.ok) {
            throw new Error('Error al obtener datos del clima');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

export const searchCities = async (query, language = 'es') => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Error en la búsqueda');
        }

        return await response.json();
    } catch (error) {
        console.error('Error searching cities:', error);
        throw error;
    }
}; 