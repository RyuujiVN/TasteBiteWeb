import { IsEnum } from 'class-validator';
import { PaymentStatusEnum } from 'src/common/enums/payment.enum';

export class UpdatePaymentStatusDTO {
  @IsEnum(PaymentStatusEnum)
  payment_status: PaymentStatusEnum;
}
