import { FC, useContext } from 'react';
import { BusStation } from '@src/api/model';
import BusStopDetail from '@src/components/BusStopDetail';
import { BusRouteOfStop, BusStationWithRoutesInfo } from '@src/model';
import { NearbyStopInfoContext } from './context/nearByStopInfo.context';

const getBusStationWithRoutesInfo = (
  stationUID: string,
  busStationData: BusStation[],
  busRouteOfStopData: BusRouteOfStop[]
): BusStationWithRoutesInfo | null => {
  const selectedBusStation = busStationData.find(
    ({ StationUID }) => StationUID === stationUID
  );
  if (selectedBusStation) {
    const { Stops } = selectedBusStation;
    const busRoutesOfStation =
      Stops?.reduce<BusRouteOfStop[]>((routesOfStation, stop) => {
        const routeOfStop = busRouteOfStopData.find(
          (route) =>
            route.RouteUID === stop.RouteUID && route.StopUID === stop.StopUID
        );
        return routeOfStop
          ? [...routesOfStation, routeOfStop]
          : routesOfStation;
      }, []) || [];
    return {
      ...selectedBusStation,
      BusRoutesOfStation: busRoutesOfStation,
    };
  }
  return null;
};

const NearbyStopDetail: FC = () => {
  const {
    selectedBusStationUID,
    setSelectedBusStationUID,
    busStationData,
    busRouteOfStopData,
  } = useContext(NearbyStopInfoContext);

  const busStationWithRoutesInfo =
    selectedBusStationUID &&
    busStationData &&
    busRouteOfStopData &&
    getBusStationWithRoutesInfo(
      selectedBusStationUID,
      busStationData,
      busRouteOfStopData
    );

  if (busStationWithRoutesInfo) {
    return (
      <BusStopDetail
        busStationWithRoutesInfo={busStationWithRoutesInfo}
        goBackAction={() => setSelectedBusStationUID(null)}
      />
    );
  }

  return null;
};

export default NearbyStopDetail;
