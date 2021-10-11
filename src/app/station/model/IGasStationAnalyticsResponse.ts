export interface IGasStationAnalyticsResponse {
  id: number;
  owner: string;
  flag: string;
  type: string;
  name: string;
  address: string;
  municipality: string;
  province: string;
  latitude: number;
  longitude: number;
  status: GasStationStatus;
}

export enum GasStationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
