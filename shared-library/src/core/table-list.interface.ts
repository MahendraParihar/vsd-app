import { ICommonSEO } from '../base.interface';

export interface ITableList<T> extends ICommonSEO {
  data: T[];
  count: number;
}

export interface ITableListFilter {
  page: number;
  limit: number;
  search?: string;
}
