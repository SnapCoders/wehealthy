import { Response } from 'express';
import { Raw } from 'typeorm';

import { IFilter } from '@shared/contracts/IFilter';
import { IOrder } from '@shared/contracts/IOrder';
import { IQuery, IQueryRequest } from '@shared/contracts/IQuery';

type IPaginate = { query: IQueryRequest; total: number };

const defaultQuery: IQueryRequest = {
  filters: [],
  orders: [],
  pagination: { page: 1, skip: 0, take: 20, total: 0 },
  relations: undefined,
};

class QueryHelper {
  public get(query: IQueryRequest = defaultQuery): IQuery {
    if (!query.filters) {
      query = { ...query, filters: defaultQuery.filters };
    }

    if (!query.orders) {
      query = { ...query, orders: defaultQuery.orders };
    }

    if (!query.pagination) {
      query = { ...query, pagination: defaultQuery.pagination };
    }

    if (!query.relations) {
      query = { ...query, relations: defaultQuery.relations };
    }

    const { filters, orders, relations, pagination } = query;

    const parsedFilters =
      typeof query.filters === 'string'
        ? JSON.parse(filters as unknown as string)
        : [];

    const parsedOrders =
      typeof query.orders === 'string'
        ? JSON.parse(orders as unknown as string)
        : [];

    return {
      where: this.where(parsedFilters),
      order: this.order(parsedOrders),
      relations: relations?.split(',').map(item => item.trim()),
      pagination: { skip: pagination.skip, take: pagination.take },
    };
  }

  private where(filters: IFilter[] = []): Record<string, unknown>[] {
    const conditions = filters.reduce((acc, { property, value }) => {
      const countOfPropertyRepeat = filters.filter(
        item => item.property === property,
      );

      if (countOfPropertyRepeat.length > 1) {
        let conditionMore = '';

        countOfPropertyRepeat.forEach((item, index) => {
          if (index === 0) {
            conditionMore = `LOWER(${item.property}) Like LOWER('%${item.value}%') `;
          }

          conditionMore += `OR LOWER(${item.property}) Like LOWER('%${item.value}%') `;
        });

        acc.push({ [property]: Raw(() => conditionMore) });
      }

      acc.push({
        [property]: Raw(() => `LOWER(${property}) Like LOWER('%${value}%')`),
      });

      return acc;
    }, []);

    // conditions.push({ id: Not('') });

    return conditions;
  }

  private order(orders: IOrder[] = []): Record<string, unknown> {
    const conditions = orders.reduce(
      (acc, item) => ({ ...acc, [item.property]: item.type }),
      {},
    );

    return conditions;
  }

  public paginate(response: Response, { query, total }: IPaginate): void {
    if (!query.pagination) return;

    const pagination = JSON.parse(query?.pagination as unknown as string);

    response.setHeader('X-Pagination-Page', Number(pagination?.page || 1));
    response.setHeader('X-Pagination-Skip', Number(pagination?.skip || 0));
    response.setHeader('X-Pagination-Take', Number(pagination?.take || 10));
    response.setHeader(
      'X-Pagination-Pages',
      Math.ceil(Number(total / pagination?.take)),
    );
    response.setHeader('X-Total-Count', Number(total));
  }
}

const INSTANCE = new QueryHelper();

export { INSTANCE as Query };
