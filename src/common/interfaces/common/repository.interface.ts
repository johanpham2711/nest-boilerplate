import { IPaginationResponse } from './pagination.interface';

export interface IRepository<T> {
  create(data: unknown): Promise<T>;
  findOne(query: unknown): Promise<T | null>;
  findMany(query: unknown): Promise<T[]>;
  pagination(params: {
    page?: number;
    pageSize?: number;
    cursor?: unknown;
    where?: unknown;
    orderBy?: unknown;
  }): Promise<IPaginationResponse<T>>;
  update(params: { where: unknown; data: unknown }): Promise<T>;
  delete(query: unknown): Promise<T>;
}
