import { FC, useContext, useRef, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { GoogleMapContext } from '@src/context/googleMap.context';
import useCurrentLocation from '@src/hooks/useCurrentLocation.hook';
import useWindowHeight from '@src/hooks/useWindowHeight.hook';
import currentIcon from '@img/currentIcon.svg';

const MyCurrentLocationMap: FC = () => {
  const { isLoaded, loadError, defaultMapSetting } =
    useContext(GoogleMapContext);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const currentLocation = useCurrentLocation();
  const windowHeight = useWindowHeight();

  return (
    <div>
      {isLoaded && !loadError && (
        <GoogleMap
          id="map"
          mapContainerStyle={{
            width: '100vw',
            height: `${windowHeight}px`,
          }}
          zoom={14}
          center={currentLocation}
          options={{
            ...defaultMapSetting,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP,
            },
          }}
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
