import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDTO {
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
