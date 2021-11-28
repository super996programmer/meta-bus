import { FC, useContext, useEffect } from 'react';
import BusStopDetail from '@src/components/BusStopDetail';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchTdxApi from '@src/api/useFetchTdxApi.hook';
import { fetchBusStation } from '@src/api/fetchBusStation';
import { CitySelectContext } from '@src/context/citySelect.context';
import { fetchBusRouteByStation } from '@src/api/fetchBusRouteByStation';
import { fetchEstimatedTimeOfArrivalByStation } from '@src/api/fetchEstimatedTimeOfArrivalByStation';
import { BusN1EstimateTime, BusRoute, BusStation } from '@src/api/model';
import { BusRouteOfStop } from '@src/model';
import BusStopMap from './BusStopMap';

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
  const navigate = useNavigate();
  const { stationID } = useParams();

  const { selectedCity } = useContext(CitySelectContext);

  const {
    fetchData: fetchBusStationData,
    data: busStationData,
    isLoading: isFetchBusStationLoading,
  } = useFetchTdxApi(fetchBusStation);
  const {
    fetchData: fetchBusRouteByStationData,
    data: busRouteByStationData,
    isLoading: isFetchBusRouteByStationLoading,
  } = useFetchTdxApi(fetchBusRouteByStation);

  const {
    fetchData: fetchEstimatedTimeOfArrivalByStationData,
    data: estimatedTimeOfArrivalByStationData,
    isLoading: isFetchEstimatedTimeOfArrivalByStationLoading,
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
  }, [
    selectedCity,
    stationID,
    fetchBusStationData,
    fetchBusRouteByStationData,
    fetchEstimatedTimeOfArrivalByStationData,
  ]);

  if (
    !isFetchBusStationLoading &&
    !isFetchBusRouteByStationLoading &&
    !isFetchEstimatedTimeOfArrivalByStationLoading &&
    busStationData &&
    busStationData[0] &&
    busRouteByStationData &&
    estimatedTimeOfArrivalByStationData
  ) {
    const busStationWithRoutesInfo = getBusStationWithRoutesInfo(
      busStationData[0],
      busRouteByStationData,
      estimatedTimeOfArrivalByStationData
    );
    return (
      <>
        <BusStopMap busStationInfo={busStationData[0]} />
        <BusStopDetail
          busStationWithRoutesInfo={busStationWithRoutesInfo}
          goBackAction={() => {
            navigate(-1);
          }}
        />
      </>
    );
  }

  return null;
};

export default BusStop;
