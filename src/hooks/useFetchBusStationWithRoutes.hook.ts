import { useState, useEffect, useCallback } from 'react';
import useFetchTdxApi from '@src/api/useFetchTdxApi.hook';
import { QueryOptions } from 'odata-query';
import { fetchBusStation } from '@src/api/fetchBusStation';
import { fetchBusRoute } from '@src/api/fetchBusRoute';
import { fetchEstimatedTimeOfArrival } from '@src/api/fetchEstimatedTimeOfArrival';
import {
  BusRoute,
  BusN1EstimateTime,
  CityType,
  BusStation,
  SpatialFilter,
} from '@src/api/model';
import { RE_FETCH_API_INTERVAL_IN_SECONDS } from '@src/api/constants';
import { RouteOfStopMapping, BusRouteOfStop } from '@src/model';

const getBusRouteOfStopData = (
  routeOfStopMapping: RouteOfStopMapping[],
  busRouteData: BusRoute[],
  estimatedTimeOfArrivalData: BusN1EstimateTime[]
): BusRouteOfStop[] =>
  routeOfStopMapping.map((routeOfStop) => {
    const { RouteUID, StopUID, StationUID } = routeOfStop;
    const routeInfo = busRouteData.find((route) => route.RouteUID === RouteUID);
    const estimatedTimeInfo = estimatedTimeOfArrivalData.find(
      (estimatedTime) =>
        estimatedTime.RouteUID === RouteUID && estimatedTime.StopUID === StopUID
    );
    const { RouteName, DepartureStopNameZh, DestinationStopNameZh } =
      routeInfo || {};
    const { EstimateTime, Direction, StopStatus } = estimatedTimeInfo || {};
    return {
      StationUID,
      RouteUID,
      StopUID,
      RouteName,
      DepartureStopNameZh,
      DestinationStopNameZh,
      StopStatus,
      EstimateTime,
      Direction,
    };
  });

const useFetchBusStationWithRoutes = (city: CityType) => {
  const [busRouteOfStopData, setBusRouteOfStopData] = useState<
    BusRouteOfStop[]
  >([]);

  const {
    fetchData: fetchBusStationData,
    isLoading: isBusStationDataLoading,
    data: busStationData,
  } = useFetchTdxApi(fetchBusStation);

  const fetchBusStationWithRoutesData = useCallback(
    ({
      queryOptions,
      spatialFilter,
    }: {
      queryOptions?: Partial<QueryOptions<BusStation>>;
      spatialFilter?: SpatialFilter;
    }) => fetchBusStationData({ city, queryOptions, spatialFilter }),
    [fetchBusStationData, city]
  );

  const {
    fetchData: fetchBusRouteData,
    isLoading: isBusRouteDataLoading,
    data: busRouteData,
  } = useFetchTdxApi(fetchBusRoute);

  const {
    fetchData: fetchEstimatedTimeOfArrivalData,
    isLoading: isEstimatedTimeOfArrivalDataLoading,
    data: estimatedTimeOfArrivalData,
  } = useFetchTdxApi(fetchEstimatedTimeOfArrival);

  useEffect(() => {
    let fetchEstimatedTimeIntervalId: number;
    if (!isBusStationDataLoading && busStationData) {
      const RouteUIDOfStopSet = Array.from(
        new Set(
          busStationData.flatMap((station) =>
            station.Stops?.map((stop) => stop.RouteUID)
          )
        )
      );
      const StopUIDSet = Array.from(
        new Set(
          busStationData.flatMap((station) =>
            station.Stops?.map((stop) => stop.StopUID)
          )
        )
      );
      if (RouteUIDOfStopSet.length > 0 && StopUIDSet.length > 0) {
        fetchBusRouteData({
          city,
          queryOptions: {
            filter: { RouteUID: { in: RouteUIDOfStopSet } },
          },
        });
        fetchEstimatedTimeOfArrivalData({
          city,
          queryOptions: {
            filter: { StopUID: { in: StopUIDSet } },
          },
        });
        fetchEstimatedTimeIntervalId = window.setInterval(() => {
          fetchEstimatedTimeOfArrivalData({
            city,
            queryOptions: {
              filter: { StopUID: { in: StopUIDSet } },
            },
          });
        }, RE_FETCH_API_INTERVAL_IN_SECONDS * 1000);
      }
    }
    return () => {
      if (fetchEstimatedTimeIntervalId) {
        window.clearInterval(fetchEstimatedTimeIntervalId);
      }
    };
  }, [
    city,
    isBusStationDataLoading,
    busStationData,
    fetchBusRouteData,
    fetchEstimatedTimeOfArrivalData,
  ]);

  useEffect(() => {
    if (busStationData && busRouteData && estimatedTimeOfArrivalData) {
      const routeOfStopMapping = busStationData
        .filter((station) => station.Stops)
        .flatMap((station) => {
          const { Stops = [], StationUID } = station;
          return Stops.map((stop) => {
            const { RouteUID, StopUID } = stop;
            return {
              StationUID,
              RouteUID,
              StopUID,
            };
          });
        });
      const data = getBusRouteOfStopData(
        routeOfStopMapping,
        busRouteData,
        estimatedTimeOfArrivalData
      );
      setBusRouteOfStopData(data);
    }
  }, [busStationData, busRouteData, estimatedTimeOfArrivalData]);

  return {
    fetchBusStationWithRoutesData,
    busStationData,
    busRouteOfStopData,
    isLoading:
      isBusStationDataLoading ||
      isBusRouteDataLoading ||
      isEstimatedTimeOfArrivalDataLoading,
  };
};

export default useFetchBusStationWithRoutes;
