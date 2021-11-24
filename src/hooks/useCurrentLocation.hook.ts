import { useState, useEffect } from 'react';
import { LocationCoord } from '@src/model';

const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationCoord>({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err)
    );
  }, []);

  return currentLocation;
};

export default useCurrentLocation;
