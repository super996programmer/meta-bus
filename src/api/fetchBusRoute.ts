import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusRoute, CityType } from './model';

export interface BusRouteRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusRoute>>;
}

// 取得市區公車路線資料
export const fetchBusRoute = (
  params: BusRouteRequest = {
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
  const url = `${TDX_BUS_API}/Route/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusRoute[]>(url);
};
