/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC,
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from '@react-google-maps/api';
import ReactModalSheet from 'react-modal-sheet';
import currentIcon from '@img/currentIcon.svg';
import busStopIcon from '@img/busStopIcon.svg';
import { CitySelectContext } from '@src/context/citySelect.context';
import { GoogleMapContext } from '@src/context/googleMap.context';
import useCurrentLocation from '@src/hooks/useCurrentLocation.hook';
import useWindowHeight from '@src/hooks/useWindowHeight.hook';
import { fetchEstimatedTimeOfArrival } from '../../api/fetchEstimatedTimeOfArrival';
import { fetchRealTimeNearStop } from '../../api/fetchRealTimeNearStop';
import { fetchBusRoute } from '../../api/fetchBusRoute';
import { fetchDisplayStopOfRoute } from '../../api/fetchDisplayStopOfRoute';
import useFetchTdxApi from '../../api/useFetchTdxApi.hook';
import { formatBusStopWithSort, formatEstimateTime } from './helper';
import { ModalHeader } from './Modal';

const Sheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

const Container = styled.div`
  padding: 30px 30px 30px 10px;
`;

const BusRouteContainer = styled.div`
  border-right: 4px solid #ebebeb;
  position: relative;
`;

const ArrivalTimeContainer = styled.div<{ isBusArriving: boolean }>`
  display: flex;
  background-color: ${({ isBusArriving }) =>
    isBusArriving ? '#FEFEFE' : '#F3F3F3'};
  color: #04d219;
  font-size: ${({ theme }) => theme.fontSize.XS};
  border-radius: 20px;
  padding: 8px 10px;
  align-items: center;
  width: 75px;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
`;

const StopName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.S};
  color: #000000;
`;

const StopContainer = styled.div<{ isBusArriving: boolean; isLast: boolean }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  border-radius: 10px;
  height: 66px;

  ::after {
    content: '';
    display: inline-block;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: #d6d6d6;
    background-color: ${({ isBusArriving }) =>
      isBusArriving ? '#FFFFFF' : '#d6d6d6'};
    border: ${({ isBusArriving }) =>
      isBusArriving ? '3px solid #000000' : ''};
    position: absolute;
    right: -12px;
    top: 22px;
  }

  ${({ isLast }) =>
    !isLast &&
    css`
      ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #f3f3f3 transparent transparent transparent;
        top: 60px;
        left: 45px;
        z-index: 1;
        border-bottom: 5px;
      }
    `};
`;

const StopContainerLeft = styled.div<{ isBusArriving: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ isBusArriving }) =>
    isBusArriving ? '#FEFEFE' : '#F3F3F3'};
  background-color: ${({ isBusArriving }) =>
    isBusArriving ? '#ECFFEE' : '#FFFFFF'};
  border: ${({ isBusArriving }) => isBusArriving && '1px solid #04D219'};
  padding: 5px 20px 8px 0;
  border-radius: 10px;
  flex: 1;
`;

const BusToolTip = styled.div`
  font-size: ${({ theme }) => theme.fontSize.XS};
  text-align: center;
  border-radius: 5px;
  background-color: #666666;
  color: #ffffff;
  height: 32px;
  padding: 7px 10px;
  position: relative;
  margin: 0 15px 0 30px;

  ::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #666666;
    right: -8px;
    top: 7px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  padding: 0 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.S};
  color: ${({ isActive }) => (isActive ? '#000000' : '#666666')};
  border-bottom: ${({ isActive }) => isActive && '3px solid #000000'};
  width: 50%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RouteDetail: FC = () => {
  const { selectedCity } = useContext(CitySelectContext);
  const {
    isLoaded: mapIsLoaded,
    loadError: mapLoadError,
    defaultMapSetting: mapDefaultMapSetting,
  } = useContext(GoogleMapContext);
  const windowHeight = useWindowHeight();

  const params = useParams();
  const { routeName, routeUID } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ????????????????????????0 ????????????1 ?????????
  const [direction, setDirection] = useState(0);
  const isGoDirection = direction === 0;

  // ??????????????????????????????
  const {
    fetchData: getBusRoute,
    isLoading: isBusRouteLoading,
    data: busRouteData,
  } = useFetchTdxApi(fetchBusRoute);
  // ??????????????????????????????????????????
  const {
    fetchData: getStopOfRoute,
    isLoading: isStopOfRouteLoading,
    data: stopOfRouteData,
  } = useFetchTdxApi(fetchDisplayStopOfRoute);
  // ????????????????????????????????????(N1)
  const {
    fetchData: getEstimatedTimeOfArrival,
    isLoading: isEstimatedTimeOfArrivalLoading,
    data: estimatedTimeOfArrivalData,
  } = useFetchTdxApi(fetchEstimatedTimeOfArrival);
  // ????????????????????????????????????(A2)
  const {
    fetchData: getRealTimeNearStop,
    isLoading: isRealTimeNearStopLoading,
    data: realTimeNearStopData,
  } = useFetchTdxApi(fetchRealTimeNearStop);

  useEffect(() => {
    getBusRoute({ city: selectedCity, routeName });
    getStopOfRoute({ city: selectedCity, routeName });
    getEstimatedTimeOfArrival({ city: selectedCity, routeName });
    getRealTimeNearStop({ city: selectedCity, routeName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeName]);
  const currentBusRouteData = busRouteData?.find(
    (item) => item.RouteUID === routeUID
  );

  // ????????????
  const {
    goBusCoordinates,
    backBusCoordinates,
    goDirectionBusStopMap,
    backDirectionBusStopMap,
  } = formatBusStopWithSort(stopOfRouteData || []);

  // ????????????
  const goData = formatEstimateTime(
    estimatedTimeOfArrivalData,
    goDirectionBusStopMap,
    realTimeNearStopData
  );

  // ????????????
  const backData = formatEstimateTime(
    estimatedTimeOfArrivalData,
    backDirectionBusStopMap,
    realTimeNearStopData
  );

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const currentLocation = useCurrentLocation();

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    // @ts-ignore
    mapRef?.current?.panTo({ lat, lng });
    // @ts-ignore
    mapRef?.current?.setZoom(16);
  }, []);

  const [selected, setSelected] = useState({
    location: { lat: 0, lng: 0 },
    stopName: '',
  });

  const routeDetailData = isGoDirection ? goData : backData;
  const busBusCoordinates = isGoDirection
    ? goBusCoordinates
    : backBusCoordinates;
  const busPolyLine = isGoDirection
    ? goBusCoordinates.map((item) => item.location)
    : backBusCoordinates.map((item) => item.location);
  const goBusLineOption = {
    path: goBusCoordinates.map((item) => item.location),
    geodesic: true,
    strokeColor: '#04D219',
    strokeOpacity: 1.0,
    strokeWeight: 6,
  };

  const backBusLineOption = {
    path: backBusCoordinates.map((item) => item.location),
    geodesic: true,
    strokeColor: '#04D219',
    strokeOpacity: 1.0,
    strokeWeight: 6,
  };
  const busLineOption = isGoDirection ? goBusLineOption : backBusLineOption;
  const handleClickTab = (newDirection: number) => {
    if (newDirection !== direction) {
      setDirection(newDirection);
    }
  };

  return (
    <>
      <div>
        {mapIsLoaded && !mapLoadError && (
          <GoogleMap
            id="map"
            mapContainerStyle={{
              width: '100vw',
              height: `${windowHeight}px`,
            }}
            zoom={15}
            center={currentLocation}
            options={{
              ...mapDefaultMapSetting,
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
            <Polyline path={busPolyLine} options={busLineOption} />
            {busBusCoordinates.map((marker) => (
              <Marker
                key={`${marker.location.lat}-${marker.location.lng}`}
                position={marker.location}
                onClick={() => {
                  setSelected({
                    location: marker.location,
                    stopName: marker.stopName,
                  });
                  panTo({ lat: marker.location.lat, lng: marker.location.lng });
                }}
                label={{
                  text: `${marker.sequence}`,
                  color: '#FFFFFF',
                  fontSize: '13px',
                }}
                icon={{
                  url: busStopIcon,
                  origin: new window.google.maps.Point(0, -9),
                  anchor: new window.google.maps.Point(35, 35),
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
            ))}
            {selected.location.lat ? (
              <InfoWindow
                position={selected.location}
                onCloseClick={() => {
                  setSelected({
                    location: { lat: 0, lng: 0 },
                    stopName: '',
                  });
                }}
              >
                <div>
                  <h2>{selected.stopName}</h2>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        )}
      </div>
      <Sheet
        isOpen={isModalOpen}
        onClose={() => undefined}
        snapPoints={[0.95, 0.5, 0.2]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header>
            <ModalHeader routeName={routeName || ''} />
          </Sheet.Header>
          <Sheet.Content disableDrag>
            <TabsContainer>
              <Tab isActive={isGoDirection} onClick={() => handleClickTab(0)}>
                ???{currentBusRouteData?.DestinationStopNameZh}
              </Tab>
              <Tab isActive={!isGoDirection} onClick={() => handleClickTab(1)}>
                ???{currentBusRouteData?.DepartureStopNameZh}
              </Tab>
            </TabsContainer>
            <Container>
              <BusRouteContainer>
                {routeDetailData &&
                  [...routeDetailData.values()].map((stop, i) => {
                    // @ts-ignore
                    const { plateNumb, displayEstimatedTime } = stop;
                    const routeDetailDataSize = routeDetailData.size;
                    return (
                      <StopContainer
                        key={stop?.StopUID}
                        isBusArriving={!!plateNumb}
                        isLast={i === routeDetailDataSize - 1}
                      >
                        <StopContainerLeft isBusArriving={!!plateNumb}>
                          <ArrivalTimeContainer isBusArriving={!!plateNumb}>
                            {displayEstimatedTime}
                          </ArrivalTimeContainer>
                          <StopName>{stop?.StopName.Zh_tw}</StopName>
                        </StopContainerLeft>
                        {plateNumb && <BusToolTip>{plateNumb}</BusToolTip>}
                      </StopContainer>
                    );
                  })}
              </BusRouteContainer>
            </Container>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default RouteDetail;
