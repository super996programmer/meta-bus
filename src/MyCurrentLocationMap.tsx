import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import currentIcon from '../content/img/currentIcon.svg';

const libraries: any = ['places'];

const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
};

const options = {
  zoomControl: true,
};

interface Location {
  lat: number;
  lng: number;
}

const MyCurrentLocationMap: FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
    libraries,
  });
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: 0,
    lng: 0,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }, []);

  return (
    <div>
      {isLoaded && !loadError && (
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={currentLocation}
          options={options}
          onLoad={onMapLoad}
        >
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: currentIcon,
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default MyCurrentLocationMap;
