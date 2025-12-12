import { PaginationQuery } from 'src/common/interfaces/pagination.interface';

export interface FilterProductAdmin extends PaginationQuery {
  category_id?: string;
  deleted?: boolean;
  sort_by?: string;
  order?: string;
}

export interface FilterProductClient {
  limit?: number;
  search?: string;
  category_id?: string;
  sort_by?: string;
  order?: string;
  min_price?: string;
  max_price?: string;
  last_id?: string;
}
