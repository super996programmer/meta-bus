import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModalSheet from 'react-modal-sheet';
import busStopIcon from '@icon/busStop.svg';
import Navbar from '@src/components/Navbar';
import BusRoutesOfStationInfo from '@src/components/BusRoutesOfStationInfo';
import useCurrentLocation from '@src/hooks/useCurrentLocation.hook';
import getDistance from './utils/getDistance';
import { NearbyStopInfoContext } from './context/nearByStopInfo.context';

const Sheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

const Content = styled.div`
  padding-bottom: 45vh;
  background-color: #fafafa;
  font-size: ${({ theme }) => theme.fontSize.S};
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  border-radius: 30px 30px 0 0;
  background-color: #f3f3f3;
`;

const DistanceSelectSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  background-color: #ffffff;
`;

const DistanceSelectButton = styled.button<{ isSelected?: boolean }>`
  padding: 15px;
  color: ${({ isSelected }) => (isSelected ? '#000000' : '#666666')};
  border-bottom: ${({ isSelected }) => isSelected && '2px solid #18a8fa'};
`;

const BusStopCard = styled.div`
  padding: 15px;
  background-color: #ffffff;
  margin: 10px 0;
`;

const BusStopInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.M};
  font-weight: bold;
`;

const SecondaryText = styled.span<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : 'inherit')};
  color: #666666;
`;

const ShowMoreSection = styled.div`
  padding: 10px;
  text-align: center;
  color: #18a8fa;
`;

const distanceInMeterList = [100, 300, 500];

const NearbyStops: FC = () => {
  const {
    selectedDistanceInMeter,
    setSelectedDistanceInMeter,
    busStationData,
    busRouteOfStopData,
    setSelectedBusStationUID,
  } = useContext(NearbyStopInfoContext);
  const currentLocation = useCurrentLocation();

  const [isModalSheetOpen, setIsModalSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalSheetOpen(true);
  }, []);

  const handleShowMore = (busStationUID: string) => {
    setSelectedBusStationUID(busStationUID);
  };

  return (
    <Sheet
      isOpen={isModalSheetOpen}
      onClose={() => undefined}
      snapPoints={[0.95, 0.5, 0.2]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header>
          <Header>
            <Navbar
              title="附近站牌"
              isShowBackToButton
              isShowCitySelectButton
            />
            <DistanceSelectSection>
              {distanceInMeterList.map((distance) => (
                <DistanceSelectButton
                  key={distance}
                  isSelected={distance === selectedDistanceInMeter}
                  onClick={() => setSelectedDistanceInMeter(distance)}
                >
                  {distance} 公尺
                </DistanceSelectButton>
              ))}
            </DistanceSelectSection>
          </Header>
        </Sheet.Header>
        <Sheet.Content disableDrag>
          <Content>
            {busStationData?.map(
              ({ StationUID, StationName, StationPosition, Stops }) => (
                <BusStopCard key={StationUID}>
                  <BusStopInfo>
                    <img src={busStopIcon} width="30" alt="Bus Stop" />
                    <Title>{StationName.Zh_tw}</Title>
                    <SecondaryText>
                      距{' '}
                      {getDistance(
                        { ...currentLocation },
                        {
                          lat: StationPosition.PositionLat,
                          lng: StationPosition.PositionLon,
                        }
                      )}{' '}
                      公尺
                    </SecondaryText>
                  </BusStopInfo>
                  {Stops && busRouteOfStopData && (
                    <BusRoutesOfStationInfo
                      busRoutesOfStation={Stops.map((stop) =>
                        busRouteOfStopData.find(
                          (route) =>
                            route.RouteUID === stop.RouteUID &&
                            route.StopUID === stop.StopUID
                        )
                      )}
                      displayedRouteCount={2}
                    />
                  )}
                  <ShowMoreSection
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleShowMore(StationUID);
                    }}
                  >
                    顯示更多 {'>'}
                  </ShowMoreSection>
                </BusStopCard>
              )
            )}
          </Content>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default NearbyStops;
