import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const shipIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2 L30 28 L16 22 L2 28 L16 2Z" fill="#1c7ed6" stroke="#ffffff" stroke-width="2"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

function Map({ ships, shipHistory = {} }) {
  const position = [30, 0];

  return (
    <MapContainer center={position} zoom={3} style={{ height: '400px', width: '100%', zIndex: 100}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {ships?.map((ship) => {
        const history = shipHistory[ship.id] || [];
        const routePoints = history.map(point => [point.position_lat, point.position_lon]);
        
        return (
          <React.Fragment key={ship.id}>
            {routePoints.length > 0 && (
              <Polyline 
                positions={routePoints}
                color="#1c7ed6"
                weight={2}
                opacity={0.6}
                dashArray="5, 10"
              />
            )}
            
            <Marker 
              position={[ship.position_lat, ship.position_lon]}
              icon={shipIcon}
            >
              <Popup>
                <div>
                  <h3>{ship.name}</h3>
                  <p>Speed: {ship.speed} knots</p>
                  <p>Status: {ship.status}</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}

export default Map;
