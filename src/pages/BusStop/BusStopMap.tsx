import { FC, useContext, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import useWindowHeight from '@src/hooks/useWindowHeight.hook';
import { GoogleMapContext } from '@src/context/googleMap.context';
import busStopLocation from '@icon/busStopLocation.svg';
import { BusStation } from '@src/api/model';

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

interface Props {
  busStationInfo: BusStation;
}

const BusStopMap: FC<Props> = ({ busStationInfo }) => {
  const { isLoaded, loadError, defaultMapSetting } =
    useContext(GoogleMapContext);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const windowHeight = useWindowHeight();

  const renderMap = () => {
    const { StationName, StationPosition, StationAddress } =
      busStationInfo || {};

    const { PositionLat: lat, PositionLon: lng } = StationPosition;

    if (lat && lng) {
      return (
        <GoogleMap
          id="BusStopsMap"
          mapContainerStyle={{
            width: '100vw',
            height: `${windowHeight}px`,
          }}
          zoom={17}
          center={{ lat, lng }}
          options={{
            ...defaultMapSetting,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP,
            },
          }}
          onLoad={onMapLoad}
        >
          <Marker
            title={StationName.Zh_tw}
            position={{ lat, lng }}
            icon={{
              url: busStopLocation,
              labelOrigin: new google.maps.Point(15, 65),
            }}
            cursor="pointer"
            label={StationName.Zh_tw}
          />

          <InfoWindow
            position={{
              lat,
              lng,
            }}
            options={{
              pixelOffset: new google.maps.Size(0, -60),
              maxWidth: 200,
            }}
          >
            <InfoWindowContainer>
              <InfoWindowTitle>{StationName.Zh_tw}</InfoWindowTitle>
              <InfoWindowAddress>{StationAddress}</InfoWindowAddress>
            </InfoWindowContainer>
          </InfoWindow>
        </GoogleMap>
      );
    }

    return null;
  };

  if (loadError) {
    return null;
  }

  return <div>{isLoaded && renderMap()}</div>;
};

export default BusStopMap;
