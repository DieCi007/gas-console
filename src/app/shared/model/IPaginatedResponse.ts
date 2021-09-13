export interface IPaginatedResponse<T> {
  currentPage: number;
  currentSize: number;
  totalElements: number;
  totalPages: number;
  values: T[];
}
