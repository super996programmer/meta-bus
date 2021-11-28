import {
  FC,
  createContext,
  useState,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import useFetchBusStationWithRoutes from '@src/hooks/useFetchBusStationWithRoutes.hook';
import { BusStation } from '@src/api/model';
import { CitySelectContext } from '@src/context/citySelect.context';
import useCurrentLocation from '@src/hooks/useCurrentLocation.hook';
import { BusRouteOfStop } from '@src/model';

interface Context {
  selectedDistanceInMeter: number;
  setSelectedDistanceInMeter: Dispatch<SetStateAction<number>>;
  selectedBusStationUID: string | null;
  setSelectedBusStationUID: Dispatch<SetStateAction<string | null>>;
  busStationData: BusStation[] | null;
  busRouteOfStopData?: BusRouteOfStop[];
  isLoading: boolean;
}

export const NearbyStopInfoContext = createContext<Context>({
  selectedDistanceInMeter: 100,
  setSelectedDistanceInMeter: () => null,
  selectedBusStationUID: null,
  setSelectedBusStationUID: () => null,
  busStationData: [],
  busRouteOfStopData: [],
  isLoading: false,
});

export const NearbyStopInfoProvider: FC = ({ children }) => {
  const currentLocation = useCurrentLocation();
  const { selectedCity } = useContext(CitySelectContext);
  const [selectedDistanceInMeter, setSelectedDistanceInMeter] =
    useState<number>(100);
  const [selectedBusStationUID, setSelectedBusStationUID] = useState<
    string | null
  >(null);

  const {
    fetchBusStationWithRoutesData,
    busStationData,
    busRouteOfStopData,
    isLoading,
  } = useFetchBusStationWithRoutes(selectedCity);

  useEffect(() => {
    const { lat, lng } = currentLocation;
    if (lat && lng) {
      fetchBusStationWithRoutesData({
        spatialFilter: {
          lat,
          lng,
          distanceInMeter: selectedDistanceInMeter,
        },
      });
    }
  }, [fetchBusStationWithRoutesData, currentLocation, selectedDistanceInMeter]);

  const contextValue: Context = useMemo(
    () => ({
      selectedDistanceInMeter,
      setSelectedDistanceInMeter,
      selectedBusStationUID,
      setSelectedBusStationUID,
      busStationData,
      busRouteOfStopData,
      isLoading,
    }),
    [
      selectedDistanceInMeter,
      setSelectedDistanceInMeter,
      selectedBusStationUID,
      setSelectedBusStationUID,
      busStationData,
      busRouteOfStopData,
      isLoading,
    ]
  );

  return (
    <NearbyStopInfoContext.Provider value={contextValue}>
      {children}
    </NearbyStopInfoContext.Provider>
  );
};
