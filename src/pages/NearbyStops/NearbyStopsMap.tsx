import {
  FC,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import useCurrentLocation from '@src/hooks/useCurrentLocation.hook';
import useWindowHeight from '@src/hooks/useWindowHeight.hook';
import currentIcon from '@img/currentIcon.svg';
import { GoogleMapContext } from '@src/context/googleMap.context';
import busStopLocation from '@icon/busStopLocation.svg';
import { NearbyStopInfoContext } from './context/nearByStopInfo.context';

const InfoWindowContainer = styled.div`
  margin: 0 10px 10px 0;
`;

const InfoWindowTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.S};
  font-weight: bold;
`;

const InfoWindowAddress = styled.div`
  font-size: ${({ theme }) => theme.fontSize.XS};
  color: #666666;
`;

const StopsMap: FC = () => {
  const { isLoaded, loadError, defaultMapSetting } =
    useContext(GoogleMapContext);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const {
    busStationData,
    selectedDistanceInMeter,
    selectedBusStationUID,
    setSelectedBusStationUID,
  } = useContext(NearbyStopInfoContext);

  const currentLocation = useCurrentLocation();

  const windowHeight = useWindowHeight();

  const [mapInitialZoom, setMapInitialZoom] = useState<number>(15);

  useEffect(() => {
    switch (selectedDistanceInMeter) {
      case 500:
        setMapInitialZoom(15);
        break;
      case 300:
        setMapInitialZoom(16);
        break;
      case 100:
      default:
        setMapInitialZoom(18);
        break;
    }
  }, [selectedDistanceInMeter]);

  const [mapCurrenZoom, setMapCurrentZoom] = useState<number>(15);

  const handleClickBusStationMarker = (busStationUID: string) => {
    setSelectedBusStationUID(busStationUID);
  };

  const handleCloseBusStationInfoWindow = () => {
    setSelectedBusStationUID(null);
  };

  const renderMap = () => {
    const selectedBusStationInfo = busStationData?.find(
      ({ StationUID }) => StationUID === selectedBusStationUID
    );
    const {
      StationName: SelectedStationName,
      StationPosition: SelectedStationPosition,
      StationAddress: SelectedStationAddress,
    } = selectedBusStationInfo || {};

    return (
      <GoogleMap
        id="BusStopsMap"
        mapContainerStyle={{
          width: '100vw',
          height: `${0.8 * windowHeight}px`,
        }}
        zoom={mapInitialZoom}
        onZoomChanged={() => {
          setMapCurrentZoom(mapRef.current?.getZoom() || mapCurrenZoom);
        }}
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
        {busStationData?.map(({ StationUID, StationName, StationPosition }) => {
          const { Zh_tw: StationNameDesc } = StationName;
          const { PositionLat, PositionLon } = StationPosition;
          if (PositionLat && PositionLon) {
            return (
              <Marker
                key={StationUID}
                title={StationNameDesc}
                position={{ lat: PositionLat, lng: PositionLon }}
                icon={{
                  url: busStopLocation,
                  labelOrigin: new google.maps.Point(15, 65),
                }}
                cursor="pointer"
                label={
                  mapCurrenZoom > 17 ? { text: StationNameDesc } : undefined
                }
                onClick={() => {
                  handleClickBusStationMarker(StationUID);
                }}
              />
            );
          }

          return null;
        })}
        {selectedBusStationUID &&
          SelectedStationPosition &&
          SelectedStationPosition.PositionLat &&
          SelectedStationPosition.PositionLon && (
            <InfoWindow
              position={{
                lat: SelectedStationPosition.PositionLat,
                lng: SelectedStationPosition.PositionLon,
              }}
              options={{
                pixelOffset: new google.maps.Size(0, -60),
                maxWidth: 200,
              }}
              onCloseClick={() => {
                handleCloseBusStationInfoWindow();
              }}
            >
              <InfoWindowContainer>
                <InfoWindowTitle>{SelectedStationName?.Zh_tw}</InfoWindowTitle>
                <InfoWindowAddress>{SelectedStationAddress}</InfoWindowAddress>
              </InfoWindowContainer>
            </InfoWindow>
          )}
      </GoogleMap>
    );
  };

  if (loadError) {
    return null;
  }

  return <div>{isLoaded && renderMap()}</div>;
};

export default StopsMap;
