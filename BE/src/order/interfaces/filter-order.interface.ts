import { OrderStatusEnum } from 'src/common/enums/order.enum';
import { PaymentStatusEnum } from 'src/common/enums/payment.enum';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';

export interface OrderPaginationAdmin extends PaginationQuery {
  status?: OrderStatusEnum;
  date_start?: Date;
  date_end?: Date;
  payment_status?: PaymentStatusEnum;
}

export interface OrderPaginationClient extends PaginationQuery {
  status?: OrderStatusEnum;
  user_id: number;
}
