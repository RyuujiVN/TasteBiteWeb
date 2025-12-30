import { PaginationQuery } from 'src/common/interfaces/pagination.interface';

export interface PaginationUser extends PaginationQuery {
  status?: boolean;
}
