import {
  EstimateBusStopStatusEnum,
  BusRouteDirectionEnum,
} from '@src/api/constants';
import { BusStation, NameType } from '@src/api/model';

export interface RouteOfStopMapping {
  StationUID: string;
  RouteUID: string;
  StopUID: string;
}
export interface BusRouteOfStop {
  StationUID: string;
  RouteUID: string;
  StopUID: string;
  RouteName?: NameType;
  DepartureStopNameZh?: string;
  DestinationStopNameZh?: string;
  StopStatus?: EstimateBusStopStatusEnum;
  EstimateTime?: number;
  Direction?: BusRouteDirectionEnum;
}
export interface BusStationWithRoutesInfo extends BusStation {
  BusRoutesOfStation: BusRouteOfStop[];
}

export interface LocationCoord {
  lat: number;
  lng: number;
}
export interface IOption<T> {
  text: string;
  value: T;
}
