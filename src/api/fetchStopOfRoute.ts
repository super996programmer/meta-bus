import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusStopOfRoute, CityType } from './model';

export interface BusStopOfRouteRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusStopOfRoute>>;
}

// 取得市區公車顯示用路線站序資料
export const fetchStopOfRoute = (
  params: BusStopOfRouteRequest = {
    city: 'Taipei',
    queryOptions: {
      top: 30,
    },
  }
) => {
  const {
    city = 'Taipei',
    routeName,
    queryOptions = { top: routeName ? undefined : 30 },
  } = params;
  const query = buildQuery(queryOptions);
  const url = `${TDX_BUS_API}/StopOfRoute/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusStopOfRoute[]>(url);
};
