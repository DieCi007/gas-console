import { CommonFuelType } from './CommonFuelType';

export interface IFuelMinPrice {
  id: number;
  type: CommonFuelType;
  minPrice: number;
}
