import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusDisplayStopOfRoute, CityType } from './model';

export interface BusDisplayStopOfRouteRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusDisplayStopOfRoute>>;
}

// 取得市區公車顯示用路線站序資料
export const fetchDisplayStopOfRoute = (
  params: BusDisplayStopOfRouteRequest = {
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
  const url = `${TDX_BUS_API}/DisplayStopOfRoute/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusDisplayStopOfRoute[]>(url);
};
