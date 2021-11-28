import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RE_FETCH_API_INTERVAL_IN_SECONDS } from '@src/api/constants';
import useFetchTdxApi from '@src/api/useFetchTdxApi.hook';
import { fetchBusStation } from '@src/api/fetchBusStation';
import { CitySelectContext } from '@src/context/citySelect.context';
import { fetchBusRouteByStation } from '@src/api/fetchBusRouteByStation';
import { fetchEstimatedTimeOfArrivalByStation } from '@src/api/fetchEstimatedTimeOfArrivalByStation';
import { BusN1EstimateTime, BusRoute, BusStation } from '@src/api/model';
import { BusRouteOfStop } from '@src/model';
import BusStopMap from './BusStopMap';
import BusStopDetail from './BusStopDetail';

const getBusStationWithRoutesInfo = (
  busStation: BusStation,
  busRouteByStationData: BusRoute[],
  estimatedTimeOfArrivalByStationData: BusN1EstimateTime[]
) => {
  const { StationUID, Stops: StationStops } = busStation;
  const busRoutesOfStation: BusRouteOfStop[] =
    StationStops?.reduce<BusRouteOfStop[]>((routesOfStation, stop) => {
      const { StopUID } = stop;
      const routeInfo = busRouteByStationData.find(
        (route) => route.RouteUID === stop.RouteUID
      );
      const estimatedTimeInfo = estimatedTimeOfArrivalByStationData.find(
        (estimatedTime) =>
          estimatedTime.StopUID === stop.StopUID &&
          estimatedTime.RouteUID === stop.RouteUID
      );
      if (routeInfo && estimatedTimeInfo) {
        const {
          RouteUID,
          RouteName,
          DepartureStopNameZh,
          DestinationStopNameZh,
        } = routeInfo;
        const { EstimateTime, StopStatus, Direction } = estimatedTimeInfo;
        return [
          ...routesOfStation,
          {
            StationUID,
            RouteUID,
            StopUID,
            RouteName,
            DepartureStopNameZh,
            DestinationStopNameZh,
            EstimateTime,
            StopStatus,
            Direction,
          },
        ];
      }

      return routesOfStation;
    }, []) || [];

  return {
    ...busStation,
    BusRoutesOfStation: busRoutesOfStation,
  };
};

const BusStop: FC = () => {
  console.log('BusStop Run');
  const { stationID } = useParams();

  const { selectedCity } = useContext(CitySelectContext);

  const {
    fetchData: fetchBusStationData,
    data: busStationData,
    // isLoading: isFetchBusStationLoading,
  } = useFetchTdxApi(fetchBusStation);

  const {
    fetchData: fetchBusRouteByStationData,
    data: busRouteByStationData,
    // isLoading: isFetchBusRouteByStationLoading,
  } = useFetchTdxApi(fetchBusRouteByStation);

  const {
    fetchData: fetchEstimatedTimeOfArrivalByStationData,
    data: estimatedTimeOfArrivalByStationData,
    // isLoading: isFetchEstimatedTimeOfArrivalByStationLoading,
  } = useFetchTdxApi(fetchEstimatedTimeOfArrivalByStation);

  useEffect(() => {
    fetchBusStationData({
      city: selectedCity,
      queryOptions: {
        filter: { StationID: { eq: stationID } },
      },
    });
    fetchBusRouteByStationData({
      city: selectedCity,
      stationID,
    });
    fetchEstimatedTimeOfArrivalByStationData({
      city: selectedCity,
      stationID,
    });

    const fetchEstimatedTimeIntervalId = window.setInterval(() => {
      fetchEstimatedTimeOfArrivalByStationData({
        city: selectedCity,
        stationID,
      });
    }, RE_FETCH_API_INTERVAL_IN_SECONDS * 1000);

    return () => {
      window.clearInterval(fetchEstimatedTimeIntervalId);
    };
  }, [
    selectedCity,
    stationID,
    fetchBusStationData,
    fetchBusRouteByStationData,
    fetchEstimatedTimeOfArrivalByStationData,
  ]);

  const selectedBusStationInfo = busStationData?.[0];

  const busStationWithRoutesInfo =
    selectedBusStationInfo &&
    busRouteByStationData &&
    estimatedTimeOfArrivalByStationData
      ? getBusStationWithRoutesInfo(
          busStationData[0],
          busRouteByStationData,
          estimatedTimeOfArrivalByStationData
        )
      : undefined;

  return (
    <>
      {selectedBusStationInfo && (
        <div>
          <BusStopMap busStationInfo={selectedBusStationInfo} />
          <BusStopDetail
            busStationInfo={selectedBusStationInfo}
            busStationWithRoutesInfo={busStationWithRoutesInfo}
          />
        </div>
      )}
    </>
  );
};

export default BusStop;
