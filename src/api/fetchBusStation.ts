import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusStation, CityType } from './model';

interface SpatialFilter {
  lat: number;
  lng: number;
  distanceInMeter: number;
}

export interface BusStationRequest {
  city?: CityType;
  queryOptions?: Partial<QueryOptions<BusStation>>;
  spatialFilter?: SpatialFilter;
}

// 取得市區公車站牌所屬站位資料
export const fetchBusStation = (
  params: BusStationRequest = {
    city: 'Taipei',
    queryOptions: {
      top: 30,
    },
  }
) => {
  const { city = 'Taipei', queryOptions = { top: 30 }, spatialFilter } = params;
  const query = buildQuery(queryOptions);
  const spatialFilterQuery = spatialFilter
    ? `$spatialFilter=nearby(${spatialFilter.lat}, ${spatialFilter.lng}, ${spatialFilter.distanceInMeter})`
    : '';
  const url = `${TDX_BUS_API}/Station/City/${city}${query}${
    query ? `&${spatialFilterQuery}` : `?${spatialFilterQuery}`
  }`;

  return fetchTdxApi<BusStation[]>(url);
};
