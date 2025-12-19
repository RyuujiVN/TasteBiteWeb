import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { phoneRegex } from 'src/common/constants/regex.constant';
import { PaymentMethodEnum } from 'src/common/enums/payment.enum';
import { ShippingAddressDTO } from './shipping-address.dto';
import { DeliveryDateDTO } from './delivery-time.dto';
import { ProductItemDTO } from './product-item.dto';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  name: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum(PaymentMethodEnum)
  payment_method: PaymentMethodEnum;

  @IsString()
  @Matches(phoneRegex, { message: 'Số điện thoại không đúng định dạng' })
  phone: string;

  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shipping_address: ShippingAddressDTO;

  @ValidateNested()
  @Type(() => DeliveryDateDTO)
  delivery: DeliveryDateDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDTO)
  line_items: ProductItemDTO[];
}
