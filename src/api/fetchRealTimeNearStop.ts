import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusA2Data, CityType } from './model';

export interface RealTimeNearStopRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusA2Data>>;
}

// 取得市區公車動態定點資料(A2)
export const fetchRealTimeNearStop = (
  params: RealTimeNearStopRequest = {
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
  const url = `${TDX_BUS_API}/RealTimeNearStop/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusA2Data[]>(url);
};
