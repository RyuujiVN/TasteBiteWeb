import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { phoneRegex } from 'src/common/constants/regex.constant';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Họ tên không quá 50 chữ' })
  @MinLength(5, { message: 'Họ tên lớn hơn 3 chữ' })
  full_name: string;

  @IsNotEmpty()
  @IsNumber()
  province: number;

  @IsNotEmpty()
  @IsString()
  @Matches(phoneRegex, {
    message: 'Số điện thoại chứa 10 chữ số và bắt đầu bằng 0',
  })
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  ward: number;

  @IsNotEmpty()
  @IsString()
  street: string;
}
