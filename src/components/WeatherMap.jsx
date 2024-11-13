import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ lat, lon, city }) => {
    return (
        <div className="weather-map">
            <MapContainer
                center={[lat, lon]}
                zoom={13}
                style={{ height: '300px', borderRadius: '8px' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]}>
                    <Popup>
                        {city}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default WeatherMap; 