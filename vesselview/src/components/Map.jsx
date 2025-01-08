import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  const position = [51.505, -0.09]; // Default coordinates (e.g., London)

  return (
    <MapContainer center={position} zoom={5} style={{ height: '400px', width: '100%', zIndex: 100}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Vessel A</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
