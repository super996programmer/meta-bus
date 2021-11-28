import { BusStation } from '@src/api/model';
import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import getDistance from '@src/utils/getDistance';
import busStopIcon from '@icon/busStop.svg';
import useCurrentLocation from '@src/hooks/useCurrentLocation.hook';

interface Props {
  searchValue: string;
  busStationData: BusStation[];
}

const Container = styled.div`
  padding: 20px;
`;

const SecondaryText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.S};
  color: #666666;
`;

const StationInfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const StationInfoDesc = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const StationInfoTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.M};
`;

const getDistanceString = (distanceInMeter: number) => {
  if (distanceInMeter > 1000) {
    const fixedPoint = distanceInMeter > 10000 ? 0 : 1;
    return `距 ${(distanceInMeter / 1000).toFixed(fixedPoint)} 公里`;
  }
  return `距 ${distanceInMeter} 公尺`;
};

const SearchResult: FC<Props> = ({ searchValue, busStationData }) => {
  const navigate = useNavigate();
  const { lat: currentLat, lng: currentLng } = useCurrentLocation();

  if (searchValue) {
    return (
      <Container>
        <SecondaryText>搜尋結果</SecondaryText>
        {busStationData.map(
          ({ StationUID, StationID, StationName, StationPosition }) => {
            const { PositionLat: stationLat, PositionLon: stationLng } =
              StationPosition;
            const distance =
              currentLat &&
              currentLng &&
              stationLat &&
              stationLng &&
              getDistance(
                { lat: currentLat, lng: currentLng },
                { lat: stationLat, lng: stationLng },
                'meters'
              );
            return (
              <StationInfoBlock
                key={StationUID}
                onClick={() => navigate(`/BusStop/${StationID}`)}
              >
                <img src={busStopIcon} width="30" alt="Bus Stop" />
                <StationInfoDesc>
                  <StationInfoTitle>{StationName.Zh_tw}</StationInfoTitle>
                  <SecondaryText>
                    {!!distance && getDistanceString(distance)}
                  </SecondaryText>
                </StationInfoDesc>
              </StationInfoBlock>
            );
          }
        )}
      </Container>
    );
  }

  return null;
};

export default SearchResult;
