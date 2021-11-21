import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusN1EstimateTime, CityType } from './model';

export interface EstimatedTimeOfArrivalRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusN1EstimateTime>>;
}

// 取得市區公車預估到站資料(N1)
export const fetchEstimatedTimeOfArrival = (
  params: EstimatedTimeOfArrivalRequest = {
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
  const url = `${TDX_BUS_API}/EstimatedTimeOfArrival/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusN1EstimateTime[]>(url);
};
