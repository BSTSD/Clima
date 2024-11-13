import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

const FavoriteButton = ({ city }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(city);

    return (
        <button
            onClick={() => toggleFavorite(city)}
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
        >
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
};

export default FavoriteButton; 