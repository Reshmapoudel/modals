import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet/dist/";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useMemo, useRef, useState } from "react";
import { LatLng, LocationEvent, Map as Maps } from "leaflet";

interface mapProps {
  latitudeProps?: any;
  logintudeProps?: any;
  lat: number;
  lng: number;
  drag?: boolean;
  useUserLocation?: boolean | undefined;
  onSetLocation?: (latlng: LatLng) => void;
  useUserSearchLocation: boolean;
}
const Map: React.FC<mapProps> = ({
  lat,
  lng,
  drag,
  useUserLocation,
  onSetLocation,
  useUserSearchLocation = false,
  latitudeProps,
  logintudeProps,
}) => {
  const [getMap, setMap] = useState<Maps | null>(null);
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onSetLocation && onSetLocation(marker.getLatLng());
        }
      },
    }),
    [onSetLocation]
  );

  // useEffect(() => {
  //   const value = true
  // if (lat !== 0 && lng !== 0)
  //   <UserLocator useUserLocation={value} onSetLocation={onSetLocation} />
  // })
  useEffect(() => {
    if (useUserSearchLocation) {
      if (getMap) {
        getMap.flyTo([lat, lng], 14);
      }
    }
  });
  return (
    <div className="w-full h-full z-1 sm:w-full sm:h-full">
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        scrollWheelZoom={true}
        // whenCreated={(map:any) => setMap(map)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={[lat, lng]} radius={1000} />
        <Marker
          position={[lat, lng]}
          draggable={drag}
          ref={markerRef}
          eventHandlers={eventHandlers}
        ></Marker>
        {lat === 0 && lng === 0 ? (
          <UserLocator useUserLocation={true} onSetLocation={onSetLocation} />
        ) : (
          <UserLocator
            useUserLocation={useUserLocation}
            onSetLocation={onSetLocation}
          />
        )}
      </MapContainer>
    </div>
  );
};
const UserLocator: React.FC<userLocatorProps> = ({
  useUserLocation,
  onSetLocation,
}) => {
  const map = useMapEvents({
    locationfound(e: LocationEvent) {
      map.flyTo(e.latlng, map.getZoom());
      onSetLocation && onSetLocation(e.latlng);
    },
  });
  useEffect(() => {
    if (useUserLocation) map.locate();
  }, [useUserLocation, map]);
  return <></>;
};
interface userLocatorProps {
  useUserLocation?: boolean | undefined;
  onSetLocation?: (latlng: LatLng) => void;
}

export default Map;
