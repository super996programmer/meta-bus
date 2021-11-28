import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusN1EstimateTime, CityType } from './model';

export interface EstimatedTimeOfArrivalByStationRequest {
  city?: CityType;
  stationID?: string;
  queryOptions?: Partial<QueryOptions<BusN1EstimateTime>>;
}

// 取得市區站位公車預估到站資料(N1)
export const fetchEstimatedTimeOfArrivalByStation = (
  params: EstimatedTimeOfArrivalByStationRequest = {}
) => {
  const {
    city = 'Taipei',
    stationID,
    queryOptions = { top: stationID ? undefined : 30 },
  } = params;
  const query = buildQuery(queryOptions);
  const url = `${TDX_BUS_API}/EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${stationID}${query}`;

  return fetchTdxApi<BusN1EstimateTime[]>(url);
};
