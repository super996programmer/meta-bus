import buildQuery, { QueryOptions } from 'odata-query';
import { TDX_BUS_API } from './constants';
import fetchTdxApi from './fetchTdxApi';
import { BusShape, CityType } from './model';

export interface BusShapeRequest {
  city?: CityType;
  routeName?: string;
  queryOptions?: Partial<QueryOptions<BusShape>>;
}

// 取得市區公車顯示用路線站序資料
export const fetchBusShape = (
  params: BusShapeRequest = {
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
  const url = `${TDX_BUS_API}/Shape/City/${city}${
    routeName ? `/${routeName}` : ''
  }${query}`;

  return fetchTdxApi<BusShape[]>(url);
};
