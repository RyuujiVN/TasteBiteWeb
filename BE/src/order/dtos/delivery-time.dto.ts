import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DeliveryEnum } from 'src/common/enums/delivery.enum';

export class DeliveryDateDTO {
  @IsDateString()
  @IsNotEmpty({ message: 'Ngày giao không được để trống' })
  date: Date;

  @IsEnum(DeliveryEnum)
  delivery_time_type: DeliveryEnum;

  @IsString()
  @IsOptional()
  delivery_time_range: string;
}
