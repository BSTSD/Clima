import React from 'react';
import './DynamicBackground.css';

const DynamicBackground = ({ weatherCode }) => {
    const getWeatherBackground = () => {
        // Background general para la aplicación
        return "https://i.pinimg.com/originals/e9/b4/c3/e9b4c3df809e3a58d7834e9058c89aec.gif";
    };

    return (
        <div className="dynamic-background">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${getWeatherBackground()})` }}
            />
            <div className="weather-overlay" />
        </div>
    );
};

export default DynamicBackground; 