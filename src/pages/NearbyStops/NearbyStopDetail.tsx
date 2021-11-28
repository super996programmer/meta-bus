import { FC, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactModalSheet from 'react-modal-sheet';
import { BusStation } from '@src/api/model';
import Navbar from '@src/components/Navbar';
import BusStopInfo from '@src/components/BusStopInfo';
import { BusRouteOfStop, BusStationWithRoutesInfo } from '@src/model';
import { NearbyStopInfoContext } from './context/nearByStopInfo.context';

const Sheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

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

  const [isModalSheetOpen, setIsModalSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalSheetOpen(true);
  }, []);

  if (busStationWithRoutesInfo) {
    const { StationName } = busStationWithRoutesInfo;
    return (
      <Sheet
        isOpen={isModalSheetOpen}
        onClose={() => undefined}
        snapPoints={[0.95, 0.5, 0.2]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header>
            <Navbar
              title={StationName.Zh_tw}
              isShowBackToButton
              onClickBackToButtonAction={() => {
                setSelectedBusStationUID(null);
              }}
              isShowCitySelectButton={false}
            />
          </Sheet.Header>
          <Sheet.Content disableDrag>
            <BusStopInfo busStationWithRoutesInfo={busStationWithRoutesInfo} />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    );
  }

  return null;
};

export default NearbyStopDetail;
