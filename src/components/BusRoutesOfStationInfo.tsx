import { FC } from 'react';
import styled from 'styled-components';
import {
  BusRouteDirectionEnum,
  EstimateBusStopStatusEnum,
} from '@src/api/constants';
import { BusRouteOfStop } from '../pages/NearbyStops/model';

const BusRouteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  font-size: ${({ theme }) => theme.fontSize.S};
`;

const NameBadge = styled.span`
  display: inline-block;
  flex: 0 0 100px;
  text-align: center;
  padding: 5px;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fontSize.XS};
  font-weight: bold;
  color: #18a8fa;
  background-color: #f3f3f3;
`;

const SecondaryText = styled.span<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : 'inherit')};
  color: #666666;
`;

const RemainingTimeText = styled.span`
  flex: 0 0 80px;
  text-align: right;
  margin-left: auto;
  color: #04d219;
`;

const getEstimateBusStopStatus = (
  busStopStatus?: EstimateBusStopStatusEnum,
  estimateTime?: number
) => {
  switch (busStopStatus) {
    case EstimateBusStopStatusEnum.Normal:
      if (estimateTime) {
        if (estimateTime < 60) {
          return '即將進站';
        }
        if (estimateTime > 3600) {
          const nextBusTime = new Date(
            new Date().getTime() + estimateTime * 1000
          ).toLocaleTimeString([], {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
          return nextBusTime;
        }
        return `${Math.round(estimateTime / 60)} 分`;
      }
      return '時間預估中';
    case EstimateBusStopStatusEnum.BusAtDepot:
      return '尚未發車';
    case EstimateBusStopStatusEnum.Rerouted:
      return '交管不停靠';
    case EstimateBusStopStatusEnum.ServiceOver:
      return '末班車已過';
    case EstimateBusStopStatusEnum.NoService:
      return '今日未營運';
    default:
      return '狀態不明';
  }
};

interface Props {
  busRoutesOfStation: (BusRouteOfStop | undefined)[];
  displayedRouteCount?: number;
}

const BusRoutesOfStationInfo: FC<Props> = ({
  busRoutesOfStation,
  displayedRouteCount,
}) => (
  <>
    {busRoutesOfStation?.slice(0, displayedRouteCount).map((route) => {
      if (route) {
        const {
          RouteUID,
          StopUID,
          RouteName,
          DepartureStopNameZh,
          DestinationStopNameZh,
          StopStatus,
          EstimateTime,
          Direction,
        } = route;
        return (
          <BusRouteInfo key={`${RouteUID}-${StopUID}`}>
            <NameBadge>{RouteName && RouteName.Zh_tw}</NameBadge>
            <div>
              <div>{`${DepartureStopNameZh} - ${DestinationStopNameZh}`}</div>
              <SecondaryText fontSize="13px">
                往
                {Direction === BusRouteDirectionEnum.Departure
                  ? DestinationStopNameZh
                  : DepartureStopNameZh}
              </SecondaryText>
            </div>
            <RemainingTimeText>
              {getEstimateBusStopStatus(StopStatus, EstimateTime)}
            </RemainingTimeText>
          </BusRouteInfo>
        );
      }
      return null;
    })}
  </>
);

export default BusRoutesOfStationInfo;
