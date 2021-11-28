import { useLoadScript } from '@react-google-maps/api';
import { FC, createContext, useMemo } from 'react';

interface Context {
  isLoaded: boolean;
  loadError?: Error;
  defaultMapSetting: google.maps.MapOptions;
}

const defaultMapSetting: google.maps.MapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  clickableIcons: false,
  gestureHandling: 'greedy',
  minZoom: 10,
};

export const GoogleMapContext = createContext<Context>({
  isLoaded: false,
  loadError: undefined,
  defaultMapSetting,
});

export const GoogleMapProvider: FC = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBIKo1pvwjg3vb9MBMvvBb8LoJ4tcBB160',
  });

  const contextValue: Context = useMemo(
    () => ({
      isLoaded,
      loadError,
      defaultMapSetting,
    }),
    [isLoaded, loadError]
  );

  return (
    <GoogleMapContext.Provider value={contextValue}>
      {children}
    </GoogleMapContext.Provider>
  );
};
