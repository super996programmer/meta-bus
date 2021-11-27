export const TDX_API_HOST = 'https://ptx.transportdata.tw/MOTC';

export const TDX_API_VERSION = 'v2';

export const TDX_BUS_API = `${TDX_API_HOST}/${TDX_API_VERSION}/Bus`;

export const RE_FETCH_API_INTERVAL_IN_SECONDS = 20;

// 車輛去返程
export const enum BusRouteDirectionEnum {
  Departure, // 去程
  Return, // 返程
  Loop, // 迴圈
  Unknown = 255, // 未知
}

// 車輛狀態備註
export const enum EstimateBusStopStatusEnum {
  Normal, // 正常
  BusAtDepot, // 尚未發車
  Rerouted, // 交管不停靠
  ServiceOver, // 末班車已過
  NoService, // 今日未營運
}

// 車輛於該站之進離站狀態
export const enum BusStopVehicleStatusEnum {
  Departure, // 離站
  Arrival, // 進站
}
