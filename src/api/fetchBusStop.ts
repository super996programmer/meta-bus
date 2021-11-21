import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusStop, CityType } from './model';

interface SpatialFilter {
  lat: number;
  lon: number;
  distanceInMeter: number;
}

export interface BusStopRequest {
  city?: CityType;
  queryOptions?: Partial<QueryOptions<BusStop>>;
  spatialFilter?: SpatialFilter;
}

// 取得市區公車站牌資料
export const fetchBusStop = (
  params: BusStopRequest = {
    city: 'Taipei',
    queryOptions: {
      top: 30,
    },
  }
) => {
  const { city = 'Taipei', queryOptions = { top: 30 }, spatialFilter } = params;
  const query = buildQuery(queryOptions);
  const spatialFilterQuery = spatialFilter
    ? `$spatialFilter=nearBy(${spatialFilter.lat}, ${spatialFilter.lon}, ${spatialFilter.distanceInMeter})`
    : '';
  const url = `${TDX_BUS_API}/Stop/City/${city}${query}${
    query ? `&${spatialFilterQuery}` : `?${spatialFilterQuery}`
  }`;

  return fetchTdxApi<BusStop[]>(url);
};
