import {
  BusRouteDirectionEnum,
  BusStopVehicleStatusEnum,
  EstimateBusStopStatusEnum,
} from './constants';

export type CityType = 'Taipei' | 'NewTaipei';

interface NameType {
  Zh_tw: string; // 中文繁體名稱
  En: string; // 英文名稱
}

export interface RouteOperator {
  OperatorID: string; // 營運業者代碼
  OperatorName: NameType; // 營運業者名稱
  OperatorCode: string; // 營運業者簡碼 ,
  OperatorNo: string; // 營運業者編號[交通部票證資料系統定義]
}

export interface BusSubRoute {
  SubRouteUID: string; // 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID: String; // 地區既用中之附屬路線代碼(為原資料內碼)
  OperatorIDs: string[]; // 營運業者代碼
  SubRouteName: NameType; // 附屬路線名稱
  Headsign?: string; // 車頭描述
  HeadsignEn?: string; // 車頭英文描述
  Direction: BusRouteDirectionEnum; // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  FirstBusTime?: string; // 平日第去程一班發車時間
  LastBusTime?: String; // 平日返程第一班發車時間
  HolidayFirstBusTime?: string; // 假日去程第一班發車時間
  HolidayLastBusTime?: String; // 假日返程第一班發車時間
}

export interface BusRoute {
  RouteUID: String; // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID: String; // 地區既用中之路線代碼(為原資料內碼)
  HasSubRoutes: Boolean; // 實際上是否有多條附屬路線。(此欄位值與SubRoutes結構並無強烈的絕對關聯。詳細說明請參閱swagger上方的【資料服務使用注意事項】)
  Operators: RouteOperator[]; // 營運業者
  AuthorityID: String; // 業管機關代碼
  ProviderID: String; // 資料提供平台代碼
  SubRoutes?: BusSubRoute[]; // 附屬路線資料(如果原始資料並無提供附屬路線ID，而本平台基於跨來源資料之一致性，會以SubRouteID=RouteID產製一份相對應的附屬路線資料(若有去返程，則會有兩筆))
  BusRouteType: number; // 公車路線類別 : [11:'市區公車';: 12:'公路客運',13:'國道客運',14:'接駁車']
  RouteName: NameType; // 路線名稱
  DepartureStopNameZh?: string; // 起站中文名稱
  DepartureStopNameEn?: string; // 起站英文名稱
  DestinationStopNameZh?: string; // 終點站中文名稱
  DestinationStopNameEn?: string; // 終點站英文名稱
  TicketPriceDescriptionZh?: string; // 票價中文敘述
  TicketPriceDescriptionEn?: string; // 票價英文敘述
  FareBufferZoneDescriptionZh?: string; // 收費緩衝區中文敘述
  FareBufferZoneDescriptionEn?: string; // 收費緩衝區英文敘述
  RouteMapImageUrl?: string; // 路線簡圖網址
  City?: string; // 路線權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  CityCode?: string; // 路線權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  UpdateTime: Date; // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number; // 資料版本編號
}

export interface BusStopOfRoute {
  RouteUID: string; // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID: string; // 地區既用中之路線代碼(為原資料內碼)
  RouteName: NameType; // 路線名稱
  Operators?: RouteOperator[]; // 營運業者
  SubRouteUID: string; // 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID: string; // 地區既用中之附屬路線代碼(為原資料內碼)
  SubRouteName: NameType; // 附屬路線名稱
  Direction?: BusRouteDirectionEnum; // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  City?: string; // 站牌權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  CityCode?: string; // 站牌權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  Stops: StopOfRoute[]; // 所有經過站牌
  UpdateTime: Date; // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number; // 資料版本編號
}

export interface BusDisplayStopOfRoute {
  RouteUID: string; // 路線唯一識別代碼，規則為 {業管機關代碼} + {RouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID: string; // 地區既用中之路線代碼(為原資料內碼)
  RouteName: NameType; // 路線名稱
  Direction?: BusRouteDirectionEnum; // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Stops: StopOfRoute[]; // 所有經過站牌
  UpdateTime: Date; // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number; // 資料版本編號
}

export interface StopOfRoute {
  StopUID: string; // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID: string; // 地區既用中之站牌代碼(為原資料內碼)
  StopName: NameType; // 站牌名稱
  StopBoarding?: number; // 上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車']
  StopSequence: number; // 路線經過站牌之順序
  StopPosition: PointType; // 站牌位置
  StationID?: string; // 站牌所屬的站位ID
  StationGroupID: string; // 站牌所屬的組站位ID
  LocationCityCode?: string; // 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
}

interface PointType {
  PositionLon?: number; // 位置經度(WGS84)
  PositionLat?: number; // 位置緯度(WGS84)
  GeoHash?: string; // 地理空間編碼
}

export interface BusStop {
  StopUID: string; // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID: string; // 地區既用中之站牌代碼(為原資料內碼)
  AuthorityID: string; // 業管機關代碼
  StopName: NameType; // 站牌名稱
  StopPosition: PointType; // 站牌位置
  StopAddress?: string; // 站牌地址
  Bearing?: string; // 方位角，E:東行;W:西行;S:南行;N:北行;SE:東南行;NE:東北行;SW:西南行;NW:西北行
  StationID?: string; // 站牌所屬的站位ID
  StationGroupID?: string; // 站牌所屬的組站位ID
  StopDescription?: string; // 站牌詳細說明描述
  City?: string; // 站牌權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  CityCode?: string; // 站牌權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  LocationCityCode?: string; // 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  UpdateTime: Date; // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number; // 資料版本編號
}

export interface BusN1EstimateTime {
  PlateNumb?: string; // 車牌號碼 [値為値為-1時，表示目前該站位無車輛行駛]
  StopUID?: string; // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID?: string; // 地區既用中之站牌代碼(為原資料內碼)
  StopName?: NameType; // 站牌名
  RouteUID?: string; // 路線唯一識別代碼，規則為 {業管機關代碼} + {RouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID?: string; // 地區既用中之路線代碼(為原資料內碼)
  RouteName?: NameType; // 路線名稱
  SubRouteUID?: string; // 子路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID?: string; // 地區既用中之子路線代碼(為原資料內碼)
  SubRouteName?: NameType; // 子路線名稱
  Direction: BusRouteDirectionEnum; //  去返程(該方向指的是此車牌車輛目前所在路線的去返程方向，非指站站牌所在路線的去返程方向，使用時請加值業者多加注意) : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  EstimateTime?: number; // 到站時間預估(秒) [當StopStatus値為2~4或PlateNumb値為-1時，EstimateTime値為null; 當StopStatus値為1時， EstimateTime値多數為null，僅部分路線因有固定發車時間，故EstimateTime有値; 當StopStatus値為0時，EstimateTime有値。]
  StopCountDown?: number; // 車輛距離本站站數
  CurrentStop?: string; // 車輛目前所在站牌代碼
  DestinationStop?: string; // 車輛目的站牌代碼
  StopSequence?: number; // 路線經過站牌之順序
  StopStatus?: EstimateBusStopStatusEnum; // 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運']
  MessageType?: number; // 資料型態種類 : [0:'未知',1:'定期',2:'非定期']
  NextBusTime?: string; // 下一班公車到達時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  IsLastBus?: boolean; // 是否為末班車
  Estimates?: Estimate[]; // 到站時間預估
  DataTime?: string; // 系統演算該筆預估到站資料的時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[目前僅公總提供此欄位資訊]
  TransTime?: string; // 車機資料傳輸時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz))[該欄位在N1資料中無意義]
  SrcRecTime?: string; // 來源端平台接收時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz))[該欄位在N1資料中無意義]
  SrcTransTime?: string; // 來源端平台資料傳出時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故有提供此欄位, 而非公總系統因使用整包資料更新, 故沒有提供此欄位]
  SrcUpdateTime?: string; // 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故沒有提供此欄位, 而非公總系統因提供整包資料更新, 故有提供此欄]
  UpdateTime: Date; // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}

interface Estimate {
  PlateNumb?: string; // 車輛車牌號碼 ,
  EstimateTime?: number; // 車輛之到站時間預估(秒) ,
  IsLastBus?: boolean; // 是否為末班車 ,
  VehicleStopStatus?: BusStopVehicleStatusEnum; // 車輛於該站之進離站狀態 : [0:'離站',1:'進站']
}

export interface BusA1Data {
  PlateNumb: string; // 車牌號碼
  OperatorID?: string; // 營運業者代碼
  RouteUID?: string; // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID?: string; // 地區既用中之路線代碼(為原資料內碼)
  RouteName?: NameType; // 路線名稱
  SubRouteUID?: string; // 子路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID?: string; // 地區既用中之子路線代碼(為原資料內碼)
  SubRouteName?: NameType; // 子路線名稱
  Direction?: BusRouteDirectionEnum; // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  BusPosition?: PointType; // 車輛位置經度
  Speed?: number; // 行駛速度(kph)
  Azimuth?: number; // 方位角
  DutyStatus?: number; // 勤務狀態 : [0:'正常',1:'開始',2:'結束']
  BusStatus?: number; // 行車狀況 : [0:'正常',1:'車禍',2:'故障',3:'塞車',4:'緊急求援',5:'加油',90:'不明',91:'去回不明',98:'偏移路線',99:'非營運狀態',100:'客滿',101:'包車出租',255:'未知']
  MessageType?: number; // 資料型態種類 : [0:'未知',1:'定期',2:'非定期']
  GPSTime?: Date; // 車機時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  TransTime?: string; // 車機資料傳輸時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[多數單位沒有提供此欄位資訊]
  SrcRecTime?: string; // 來源端平台接收時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  SrcTransTime?: string; // 來源端平台資料傳出時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故有提供此欄位, 而非公總系統因使用整包資料更新, 故沒有提供此欄位]
  SrcUpdateTime?: string; // 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故沒有提供此欄位, 而非公總系統因提供整包資料更新, 故有提供此欄]
  UpdateTime: Date; // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}

export interface BusA2Data {
  PlateNumb: string; // 車牌號碼
  OperatorID?: string; // 營運業者代碼
  RouteUID?: string; // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID?: string; // 地區既用中之路線代碼(為原資料內碼)
  RouteName?: NameType; // 路線名
  SubRouteUID?: string; // 子路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID?: string; // 地區既用中之子路線代碼(為原資料內碼)
  SubRouteName?: NameType; // 子路線名稱
  Direction: BusRouteDirectionEnum; // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  StopUID?: string; // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID?: string; // 地區既用中之站牌代號(為原資料內碼)
  StopName?: NameType; // 站牌名
  StopSequence?: number; // 路線經過站牌之順序
  MessageType?: number; // 資料型態種類 : [0:'未知',1:'定期',2:'非定期']
  DutyStatus?: number; // 勤務狀態 : [0:'正常',1:'開始',2:'結束']
  BusStatus?: number; // 行車狀況 : [0:'正常',1:'車禍',2:'故障',3:'塞車',4:'緊急求援',5:'加油',90:'不明',91:'去回不明',98:'偏移路線',99:'非營運狀態',100:'客滿',101:'包車出租',255:'未知']
  A2EventType?: BusStopVehicleStatusEnum; // 進站離站 : [0:'離站',1:'進站']
  GPSTime: Date; // 車機時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) [觸發到離站的GPS時間]
  TransTime?: string; // 車機資料傳輸時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[多數單位沒有提供此欄位資訊]
  SrcRecTime?: string; // 來源端平台接收時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  SrcTransTime?: string; // 來源端平台資料傳出時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故有提供此欄位, 而非公總系統因使用整包資料更新, 故沒有提供此欄位]
  SrcUpdateTime?: string; // 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故沒有提供此欄位, 而非公總系統因提供整包資料更新, 故有提供此欄]
  UpdateTime: Date; // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}

export interface BusShape {
  RouteUID: string; // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID: string; // 地區既用中之路線代碼(為原資料內碼)
  RouteName: NameType; // 路線名稱
  SubRouteUID: string; // 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID?: string; // 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteName?: NameType; // 附屬路線名稱
  Direction: BusRouteDirectionEnum; // 去返程，若無值則表示來源尚無區分去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Geometry: string; // well-known text，為路線軌跡資料
  EncodedPolyline: string; // 路線軌跡編碼(encoded polyline)
  UpdateTime: Date; // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number; // 資料版本編號(由於該服務資料不再版控，固定帶入版號0)
}
