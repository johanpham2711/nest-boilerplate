export interface IPaginationResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
