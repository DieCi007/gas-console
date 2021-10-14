import { CommonFuelType } from './CommonFuelType';

export interface IFuelMinPrice {
  id: number;
  type: CommonFuelType;
  minPrice: number;
}

export interface IFuelMinPriceUpdateReq {
  type: CommonFuelType;
  minPrice: number;
}
