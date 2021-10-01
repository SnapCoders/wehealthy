import { IFilter } from './IFilter';
import { IOrder } from './IOrder';
import { IPagination } from './IPagination';

export interface IQueryRequest {
  filters?: IFilter[];
  orders?: IOrder[];
  relations?: string;
  pagination?: IPagination;
}

export interface IQuery {
  where?: object;
  order?: object;
  relations?: string[];
  pagination?: Omit<IPagination, 'page' | 'total'>;
}
