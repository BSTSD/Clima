import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
    const [coordinates, setCoordinates] = useState(null);
    const location = useLocation();

    return (
        <div className="App">
            <div className="container">
                <SearchBar onCityChange={setCoordinates} />
                <Routes>
                    <Route
                        path="/"
                        element={<WeatherCard coordinates={coordinates} />}
                    />
                    <Route
                        path="/:city"
                        element={<WeatherCard coordinates={coordinates} />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
