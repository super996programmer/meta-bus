import { FC } from 'react';
import styled from 'styled-components';
import { BusStationWithRoutesInfo } from '@src/model';
import BusRoutesOfStationInfo from '@src/components/BusRoutesOfStationInfo';
import busStopIcon from '@icon/busStop.svg';
import busStopBgMap from '@icon/busStopBgMap.svg';
import navigateIcon from '@icon/navigate.svg';

const Container = styled.div`
  padding: 20px;
  padding-bottom: 45vh;
`;

const BusStationLocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
  background: #e9fbff url(${busStopBgMap});
`;

const BusStopTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.M};
  font-weight: bold;
  color: #18a8fa;
`;

const BusStopAddress = styled.div`
  font-size: ${({ theme }) => theme.fontSize.S};
  color: #666666;
`;

const NavigateButton = styled.a`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`;

interface Props {
  busStationWithRoutesInfo: BusStationWithRoutesInfo;
}

const BusStopInfo: FC<Props> = ({ busStationWithRoutesInfo }) => {
  const { StationName, StationAddress, StationPosition, BusRoutesOfStation } =
    busStationWithRoutesInfo;
  const { PositionLat, PositionLon } = StationPosition;

  return (
    <Container>
      <BusStationLocationInfo>
        <img src={busStopIcon} width="40" alt="Bus Stop" />
        <div>
          <BusStopTitle>{StationName.Zh_tw}</BusStopTitle>
          <BusStopAddress>{StationAddress}</BusStopAddress>
        </div>
        <NavigateButton
          href={
            PositionLat && PositionLon
              ? `https://www.google.com/maps/dir/?api=1&destination=${PositionLat},${PositionLon}`
              : ''
          }
          target="_blank"
        >
          <img src={navigateIcon} width="35" alt="Navigate" />
        </NavigateButton>
      </BusStationLocationInfo>
      <BusRoutesOfStationInfo busRoutesOfStation={BusRoutesOfStation} />
    </Container>
  );
};

export default BusStopInfo;
