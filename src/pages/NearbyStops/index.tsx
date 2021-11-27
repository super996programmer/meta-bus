import { FC, useContext } from 'react';
import NearbyStopsMap from './NearbyStopsMap';
import {
  NearbyStopInfoContext,
  NearbyStopInfoProvider,
} from './context/nearByStopInfo.context';
import NearbyStopDetail from './NearbyStopDetail';
import NearbyStops from './NearbyStops';

const Index: FC = () => {
  const { selectedBusStationUID } = useContext(NearbyStopInfoContext);
  return (
    <>
      <NearbyStopsMap />
      {selectedBusStationUID ? <NearbyStopDetail /> : <NearbyStops />}
    </>
  );
};

export default () => (
  <NearbyStopInfoProvider>
    <Index />
  </NearbyStopInfoProvider>
);
