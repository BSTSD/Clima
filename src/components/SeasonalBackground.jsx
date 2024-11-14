import React, { useState, useEffect } from 'react';
import './SeasonalBackground.css';

const SeasonalBackground = () => {
    const [season, setSeason] = useState('');

    const getSeasonalBackground = () => {
        const month = new Date().getMonth();
        const backgrounds = {
            spring: 'https://media.giphy.com/media/3o7TKDEhaXEj71Xc1G/giphy.gif',
            summer: 'https://media.giphy.com/media/QyDHI3LJx8I9hA51Qs/giphy.gif',
            autumn: 'https://media.giphy.com/media/l2R0cE5EqO3QHnhnq/giphy.gif',
            winter: 'https://media.giphy.com/media/xUPGcChZRE8p2djeiQ/giphy.gif'
        };

        // Determinar la estación según el mes
        if (month >= 2 && month <= 4) return { season: 'spring', bg: backgrounds.spring };
        if (month >= 5 && month <= 7) return { season: 'summer', bg: backgrounds.summer };
        if (month >= 8 && month <= 10) return { season: 'autumn', bg: backgrounds.autumn };
        return { season: 'winter', bg: backgrounds.winter };
    };

    useEffect(() => {
        const { season: currentSeason } = getSeasonalBackground();
        setSeason(currentSeason);
    }, []);

    return (
        <div className={`seasonal-background ${season}`}>
            <div className="background-overlay"></div>
            <div className="weather-overlay"></div>
        </div>
    );
};

export default SeasonalBackground; 