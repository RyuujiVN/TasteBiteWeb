import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { passwordRegex } from 'src/common/constants/regex.constant';

export class ChangePasswordDTO {
  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ!' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'OTP',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  otp: string;

  @ApiProperty({
    example: 'User123',
    description: 'Mật khẩu',
  })
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(passwordRegex, {
    message:
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số!',
  })
  password: string;

  @ApiProperty({
    example: 'User123',
    description: 'Xác nhận mật khẩu',
  })
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(passwordRegex, {
    message:
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số!',
  })
  confirm_password: string;
}
