'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Sighting } from '../types/sighting';

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface SightingsMapProps {
  sightings: Sighting[];
}

function MapBounds({ sightings }: { sightings: Sighting[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (sightings.length > 0) {
      const bounds = L.latLngBounds(
        sightings.map(s => [s['Latitude of Sighting'], s['Longitude of Sighting']])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [sightings, map]);
  
  return null;
}

export default function SightingsMap({ sightings }: SightingsMapProps) {
  // Show only first 500 for performance
  const displaySightings = sightings.slice(0, 500);
  
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-wraith-gray/30">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of USA
        zoom={4}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds sightings={displaySightings} />
        {displaySightings.map((sighting, idx) => (
          <Marker
            key={idx}
            position={[sighting['Latitude of Sighting'], sighting['Longitude of Sighting']]}
            icon={icon}
          >
            <Popup maxWidth={300}>
              <div className="text-black p-2">
                <h3 className="font-bold text-lg mb-2">{sighting['Tag of Apparition']}</h3>
                <p className="text-sm mb-1">
                  <strong>Location:</strong> {sighting['Nearest Approximate City']}, {sighting['US State']}
                </p>
                <p className="text-sm mb-1">
                  <strong>Date:</strong> {sighting['Date of Sighting']}
                </p>
                <p className="text-sm mb-1">
                  <strong>Time:</strong> {sighting['Time of Day']}
                </p>
                <p className="text-sm mb-2">
                  <strong>Notes:</strong> {sighting['Notes about the sighting']}
                </p>
                {sighting['Image Link'] && (
                  <img 
                    src={sighting['Image Link']} 
                    alt="Sighting" 
                    className="w-full rounded mt-2"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {sightings.length > 500 && (
        <div className="text-xs text-wraith-gray text-center mt-2">
          Showing 500 of {sightings.length} sightings
        </div>
      )}
    </div>
  );
}

