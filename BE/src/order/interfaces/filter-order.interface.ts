import { OrderStatusEnum } from 'src/common/enums/order.enum';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';

export interface OrderPagination extends PaginationQuery {
  status?: OrderStatusEnum;
  date_start?: Date;
  date_end?: Date;
}
