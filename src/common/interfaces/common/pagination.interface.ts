export interface IPaginationResponse<T> {
  items: Partial<T>[];
  page: number;
  pageSize: number;
  total: number;
}
