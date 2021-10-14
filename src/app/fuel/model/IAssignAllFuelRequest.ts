import { CommonFuelType } from './CommonFuelType';

export interface IAssignAllFuelRequest {
  type: CommonFuelType;
  fuels: number[];
}
