export type CityType = 'Taipei' | 'NewTaipei';

export interface NameType {
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
  Direction: number; // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  FirstBusTime?: string; // 平日第一班發車時間
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
  DepartureStopNameZh?: string; // 起站中文名稱 ,
  DepartureStopNameEn?: string; // 起站英文名稱 ,
  DestinationStopNameZh?: string; // 終點站中文名稱 ,
  DestinationStopNameEn?: string; // 終點站英文名稱 ,
  TicketPriceDescriptionZh?: string; // 票價中文敘述 ,
  TicketPriceDescriptionEn?: string; // 票價英文敘述 ,
  FareBufferZoneDescriptionZh?: string; // 收費緩衝區中文敘述
  FareBufferZoneDescriptionEn?: string; // 收費緩衝區英文敘述
  RouteMapImageUrl?: string; // 路線簡圖網址
  City?: string; // 路線權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  CityCode?: string; // 路線權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  UpdateTime: Date; // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number; // 資料版本編號
}
