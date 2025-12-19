import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class PriceDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000000000)
  @IsNotEmpty()
  retail: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000000000)
  @IsNotEmpty()
  sale: number;
}

export class ProductItemDTO {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  quantity: number;

  @ValidateNested()
  @Type(() => PriceDTO)
  price: PriceDTO;
}
