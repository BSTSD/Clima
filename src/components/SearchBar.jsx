import React, { useState, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onCityChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef(null);

    const searchCities = async (query) => {
        try {
            setLoading(true);

            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Error en la búsqueda');
            }

            const data = await response.json();

            return data.map(city => ({
                name: city.name,
                country: city.country,
                state: city.state,
                latitude: city.lat,
                longitude: city.lon
            }));
        } catch (error) {
            console.error('Error buscando ciudades:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (value.length > 2) {
            debounceTimeout.current = setTimeout(async () => {
                const results = await searchCities(value);
                setSuggestions(results);
                setShowSuggestions(true);
            }, 300);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const cityName = suggestion.state
            ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
            : `${suggestion.name}, ${suggestion.country}`;

        setSearchTerm(cityName);
        setShowSuggestions(false);
        onCityChange({
            name: suggestion.name,
            lat: suggestion.latitude,
            lon: suggestion.longitude
        });
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar ciudad..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
                />
            </div>
            {showSuggestions && (
                <div className="suggestions-list">
                    {loading ? (
                        <div className="suggestion-item loading">
                            <span>Buscando ciudades...</span>
                        </div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <div className="location-info">
                                    <i className="fas fa-map-marker-alt location-icon"></i>
                                    <span className="city-name">{suggestion.name}</span>
                                    <span className="country-name">
                                        {suggestion.state ? `${suggestion.state}, ` : ''}
                                        {suggestion.country}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="suggestion-item no-results">
                            <span>No se encontraron resultados</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
