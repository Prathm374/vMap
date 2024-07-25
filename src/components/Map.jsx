import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38] // size of the icon
});

const MapComponent = ({ coordinates }) => {
  const { latitude, longitude } = coordinates;
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude, map]);

  return null;
};

export default function Map({ coordinates }) {
  const { latitude, longitude } = coordinates;

  return (
    <div className='map'>
      <MapContainer center={[latitude, longitude]} zoom={15}>
        <TileLayer
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {latitude && longitude && (
          <>
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup>Your Location</Popup>
            </Marker>
            <MapComponent coordinates={coordinates} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
