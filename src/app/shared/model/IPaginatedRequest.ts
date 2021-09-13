import { SortType } from './SortType';

export interface IPaginatedRequest {
  page: number;
  size: number;
  sortBy: string;
  sortType: SortType;
}
