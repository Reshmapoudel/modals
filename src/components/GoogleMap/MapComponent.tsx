import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const MapComponent = () => {
  return (
    <div className="w-60 h-60">
      <MapContainer center={[52, -0.2]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[52, -0.2]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
