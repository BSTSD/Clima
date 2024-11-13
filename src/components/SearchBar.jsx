import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import './SearchBar.css';

const SearchBar = ({ onCityChange }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const API_KEY = '4d8fb5b93d4af21d66a2948710284366';

    const CustomNoOptionsMessage = ({ children }) => (
        <div className="select-message">{children}</div>
    );

    const CustomLoadingMessage = () => (
        <div className="select-message">Buscando...</div>
    );

    const CustomLoadingIndicator = () => (
        <div className="select-loading-indicator">
            <div className="loading-spinner" />
        </div>
    );

    const loadOptions = useCallback(async (inputValue) => {
        if (!inputValue || inputValue.length < 3) return [];

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(inputValue)}&limit=5&appid=${API_KEY}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.message || 'Error en la búsqueda');
            }

            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) {
                return [];
            }

            return data
                .filter(city => {
                    // Filtrar resultados inválidos
                    if (!city.name || !city.country) return false;

                    // Verificar si el nombre de la ciudad contiene el texto de búsqueda
                    const searchLower = inputValue.toLowerCase();
                    const cityNameLower = city.name.toLowerCase();
                    return cityNameLower.includes(searchLower);
                })
                .map(city => {
                    let label = city.name;

                    if (city.state && city.state !== city.name) {
                        label += `, ${city.state}`;
                    }

                    try {
                        const countryName = new Intl.DisplayNames(['es'], { type: 'region' }).of(city.country);
                        label += `, ${countryName}`;
                    } catch (error) {
                        label += `, ${city.country}`;
                    }

                    return {
                        value: `${city.lat},${city.lon}`,
                        label: label.trim(),
                        coordinates: {
                            lat: city.lat,
                            lon: city.lon,
                            name: city.name
                        }
                    };
                })
                .slice(0, 5);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChange = useCallback((option) => {
        if (option?.coordinates) {
            onCityChange(option.coordinates);
            navigate(`/${encodeURIComponent(option.coordinates.name)}`);
        }
    }, [navigate, onCityChange]);

    return (
        <div className="search-bar">
            <AsyncSelect
                cacheOptions={false}
                loadOptions={loadOptions}
                onChange={handleChange}
                components={{
                    NoOptionsMessage: CustomNoOptionsMessage,
                    LoadingMessage: CustomLoadingMessage,
                    LoadingIndicator: CustomLoadingIndicator
                }}
                isLoading={isLoading}
                placeholder="Buscar ciudad..."
                noOptionsMessage={({ inputValue }) =>
                    !inputValue
                        ? "Escribe para buscar"
                        : inputValue.length < 3
                            ? "Ingresa al menos 3 caracteres"
                            : "No se encontraron ciudades"
                }
                className="react-select-container"
                classNamePrefix="react-select"
                defaultOptions={[]}
                debounceTimeout={300}
            />
        </div>
    );
};

export default SearchBar;
