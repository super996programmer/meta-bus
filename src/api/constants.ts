export const TDX_API_HOST = 'https://ptx.transportdata.tw/MOTC';

export const TDX_API_VERSION = 'v2';

export const TDX_BUS_API = `${TDX_API_HOST}/${TDX_API_VERSION}/Bus`;

export const enum BusRouteDirectionEnum {
  Departure,
  Return,
  Loop,
  Unknown = 255,
}

// 車輛狀態備註
export const enum EstimateBusStopStatusEnum {
  Normal,
  BusAtDepot,
  Rerouted,
  ServiceOver,
  NoService,
}

// 車輛於該站之進離站狀態
export const enum BusStopVehicleStatusEnum {
  Departure,
  Arrival,
}
