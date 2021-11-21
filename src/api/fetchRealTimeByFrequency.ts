import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusA1Data, CityType } from './model';

export interface RealTimeByFrequencyRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusA1Data>>;
}

// 取得市區公車動態定時資料(A1)
export const fetchRealTimeByFrequency = (
  params: RealTimeByFrequencyRequest = {
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
  const url = `${TDX_BUS_API}/RealTimeByFrequency/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusA1Data[]>(url);
};
