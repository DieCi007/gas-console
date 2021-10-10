export interface IDeletePriceRequest {
  isSelf: boolean;
  readDate: Date;
  description: string;
  price: number;
  stationId: number;
}
