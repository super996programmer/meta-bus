import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusRoute, CityType } from './model';

export interface BusRouteByStationRequest {
  city?: CityType;
  stationID?: string;
  queryOptions?: Partial<QueryOptions<BusRoute>>;
}

// 取得市區公車路線資料
export const fetchBusRouteByStation = (
  params: BusRouteByStationRequest = {}
) => {
  const {
    city = 'Taipei',
    stationID,
    queryOptions = { top: stationID ? undefined : 30 },
  } = params;
  const query = buildQuery(queryOptions);
  const url = `${TDX_BUS_API}/Route/City/${city}/PassThrough/Station/${stationID}${query}`;

  return fetchTdxApi<BusRoute[]>(url);
};
