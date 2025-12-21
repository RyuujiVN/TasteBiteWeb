import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentLinkDTO {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  orderCode: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  returnUrl: string;

  @IsString()
  @IsNotEmpty()
  cancelUrl: string;
}
