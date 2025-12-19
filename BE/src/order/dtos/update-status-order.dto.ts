import { IsEnum } from 'class-validator';
import { OrderStatusEnum } from 'src/common/enums/order.enum';

export class UpdateStatusOrderDTO {
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
