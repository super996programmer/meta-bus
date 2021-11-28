import {
  EstimateBusStopStatusEnum,
  STOP_STATUS_MAP,
} from '../../api/constants';

import {
  BusN1EstimateTime,
  BusDisplayStopOfRoute,
  BusA2Data,
} from '../../api/model';

interface StopOfRouteWithEstimate extends BusDisplayStopOfRoute {
  displayEstimatedTime?: string | undefined;
  estimate?: number | undefined;
  plateNumb?: string | undefined;
}

interface FormatBusStopWithSortData {
  goBusCoordinates: Coordinates[];
  backBusCoordinates: Coordinates[];
  goDirectionBusStopMap: Map<string, BusDisplayStopOfRoute>;
  backDirectionBusStopMap: Map<string, BusDisplayStopOfRoute>;
}

interface Coordinates {
  location: Location;
  sequence: number;
  stopName: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export const formatBusStopWithSort = (
  busStopList: BusDisplayStopOfRoute[]
): FormatBusStopWithSortData => {
  const goBusCoordinates = [] as Coordinates[];
  const backBusCoordinates = [] as Coordinates[];

  const goDirectionBusStop =
    busStopList
      .find((item) => item.Direction === 0)
      ?.Stops.sort((a, b) => a.StopSequence - b.StopSequence) || [];
  const backDirectionBusStop =
    busStopList
      .find((item) => item.Direction === 1)
      ?.Stops.sort((a, b) => a.StopSequence - b.StopSequence) || [];

  const goDirectionBusStopMap = new Map<string, BusDisplayStopOfRoute>();
  const backDirectionBusStopMap = new Map<string, BusDisplayStopOfRoute>();

  goDirectionBusStop?.forEach((item) => {
    goBusCoordinates.push({
      location: {
        lng: item.StopPosition.PositionLon || 0,
        lat: item.StopPosition.PositionLat || 0,
      },
      stopName: item.StopName.Zh_tw,
      sequence: item.StopSequence,
    });
    goDirectionBusStopMap.set(item.StopUID, item);
  });

  backDirectionBusStop?.forEach((item) => {
    backBusCoordinates.push({
      location: {
        lng: item.StopPosition.PositionLon || 0,
        lat: item.StopPosition.PositionLat || 0,
      },
      stopName: item.StopName.Zh_tw,
      sequence: item.StopSequence,
    });
    backDirectionBusStopMap.set(item.StopUID, item);
  });

  return {
    goBusCoordinates,
    backBusCoordinates,
    goDirectionBusStopMap,
    backDirectionBusStopMap,
  };
};

export const getBusStopStatusDisplayWord = (
  estimateTime: number | undefined,
  stopStatus: EstimateBusStopStatusEnum | undefined
) => {
  if (estimateTime || estimateTime === 0) {
    const estimateMinute = Math.floor(estimateTime / 60);
    if (estimateTime === 0 || estimateMinute < 1) {
      return '即將進站';
    }
    return `${estimateMinute.toString()}分鐘`;
  }
  if (stopStatus) {
    return STOP_STATUS_MAP[stopStatus];
  }
  return '';
};

export const formatEstimateTime = (
  estimatedTimeData: BusN1EstimateTime[] | null,
  busStopMap: Map<string, BusDisplayStopOfRoute>,
  busNearStopData: BusA2Data[] | null
): Map<string, StopOfRouteWithEstimate | BusDisplayStopOfRoute> | null => {
  if (!estimatedTimeData || !busNearStopData) return null;
  const copyMap = new Map<string, BusDisplayStopOfRoute>(busStopMap);
  estimatedTimeData?.forEach((element) => {
    const { StopUID, EstimateTime, StopStatus } = element;
    if (StopUID && copyMap.has(StopUID)) {
      const value = {
        ...copyMap.get(StopUID),
        estimate: element.EstimateTime,
        displayEstimatedTime: getBusStopStatusDisplayWord(
          EstimateTime,
          StopStatus
        ),
      };
      copyMap.set(
        StopUID,
        value as StopOfRouteWithEstimate | BusDisplayStopOfRoute
      );
    }
  });

  busNearStopData?.forEach((element) => {
    const { StopUID } = element;

    if (StopUID && copyMap.has(StopUID)) {
      const value = {
        ...copyMap.get(StopUID),
        plateNumb: element.PlateNumb,
      };
      copyMap.set(
        StopUID,
        value as StopOfRouteWithEstimate | BusDisplayStopOfRoute
      );
    }
  });

  return copyMap;
};
